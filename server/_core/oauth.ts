import { COOKIE_NAME } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { sdk } from "./sdk";
import { ENV } from "./env";

function getQueryParam(req: Request, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}

// Manus OAuth server URL - use env or fallback to production URL
const MANUS_OAUTH_URL = ENV.oAuthServerUrl || "https://api.manus.im";

export function registerOAuthRoutes(app: Express) {
  // OAuth callback route
  app.get("/api/oauth/callback", async (req: Request, res: Response) => {
    try {
      const code = getQueryParam(req, "code");
      const state = getQueryParam(req, "state");

      console.log("[OAuth] Callback received");
      console.log("[OAuth] Code present:", !!code);
      console.log("[OAuth] State:", state);
      console.log("[OAuth] Using OAuth URL:", MANUS_OAUTH_URL);

      if (!code) {
        console.error("[OAuth] Missing authorization code in callback");
        return res.status(400).json({ error: "Missing authorization code" });
      }

      // Exchange code for token using Manus OAuth
      const tokenUrl = `${MANUS_OAUTH_URL}/api/oauth/token`;
      console.log("[OAuth] Exchanging code at:", tokenUrl);
      console.log("[OAuth] App ID:", ENV.appId);
      
      const tokenResponse = await fetch(tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          app_id: ENV.appId,
        }),
      });

      console.log("[OAuth] Token response status:", tokenResponse.status);

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        console.error("[OAuth] Token exchange failed:", tokenResponse.status, errorText);
        return res.status(401).json({ 
          error: "Authentication failed", 
          details: `Token exchange failed: ${tokenResponse.status}`,
          debug: errorText.substring(0, 200)
        });
      }

      const tokenData = await tokenResponse.json();
      console.log("[OAuth] Token exchange successful");
      console.log("[OAuth] User data received:", JSON.stringify(tokenData).substring(0, 200));
      
      const { user } = tokenData;

      if (!user || !user.open_id) {
        console.error("[OAuth] Invalid user data from OAuth:", JSON.stringify(tokenData));
        return res.status(401).json({ error: "Invalid user data from OAuth" });
      }

      console.log("[OAuth] User authenticated:", user.open_id, user.name);

      // Upsert user in database (creates if not exists, updates if exists)
      await db.upsertUser({
        openId: user.open_id,
        name: user.name || "User",
        email: user.email || "",
        role: user.open_id === ENV.ownerOpenId ? "admin" : "user",
        lastSignedIn: new Date(),
      });

      // Get the user from database
      const dbUser = await db.getUserByOpenId(user.open_id);
      console.log("[OAuth] User saved to database:", dbUser?.id);

      // Create session token using SDK
      const sessionToken = await sdk.createSessionToken(user.open_id, {
        name: user.name || dbUser?.name || "User",
      });

      // Set cookie
      res.cookie(COOKIE_NAME, sessionToken, getSessionCookieOptions(req));
      console.log("[OAuth] Session cookie set");

      // Always redirect to home page after successful login
      console.log("[OAuth] Redirecting to homepage");
      res.redirect("/");
    } catch (error) {
      console.error("[OAuth] Callback error:", error);
      res.status(500).json({ 
        error: "Authentication failed", 
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  console.log("[OAuth] Routes registered with Manus OAuth at:", MANUS_OAUTH_URL);
}
