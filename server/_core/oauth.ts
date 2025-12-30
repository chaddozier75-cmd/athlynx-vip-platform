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

export function registerOAuthRoutes(app: Express) {
  // OAuth callback route
  app.get("/api/oauth/callback", async (req: Request, res: Response) => {
    try {
      const code = getQueryParam(req, "code");
      const state = getQueryParam(req, "state");

      console.log("[OAuth] Callback received - code:", code ? "present" : "missing", "state:", state);

      if (!code) {
        console.error("[OAuth] Missing authorization code in callback");
        return res.status(400).json({ error: "Missing authorization code" });
      }

      // Exchange code for token using Manus OAuth
      console.log("[OAuth] Exchanging code for token at:", `${ENV.oAuthServerUrl}/api/oauth/token`);
      
      const tokenResponse = await fetch(`${ENV.oAuthServerUrl}/api/oauth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          app_id: ENV.appId,
        }),
      });

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        console.error("[OAuth] Token exchange failed:", tokenResponse.status, errorText);
        return res.status(401).json({ error: "Authentication failed" });
      }

      const tokenData = await tokenResponse.json();
      console.log("[OAuth] Token exchange successful, user data received");
      
      const { user } = tokenData;

      if (!user || !user.open_id) {
        console.error("[OAuth] Invalid user data from OAuth:", tokenData);
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

      // Decode the state to get the original redirect URL
      // The state is base64 encoded, but we want to redirect to home after login
      let redirectUrl = "/";
      
      if (state) {
        try {
          // State contains the original redirect URI, but we want to go to dashboard/home
          const decodedState = Buffer.from(state, "base64").toString("utf-8");
          console.log("[OAuth] Decoded state:", decodedState);
          
          // If the decoded state is the callback URL itself, redirect to home
          // Otherwise use the decoded state as the redirect
          if (decodedState.includes("/api/oauth/callback")) {
            redirectUrl = "/";
          } else {
            redirectUrl = decodedState;
          }
        } catch (e) {
          console.log("[OAuth] Could not decode state, using default redirect");
          redirectUrl = "/";
        }
      }

      console.log("[OAuth] Redirecting to:", redirectUrl);
      res.redirect(redirectUrl);
    } catch (error) {
      console.error("[OAuth] Callback error:", error);
      res.status(500).json({ error: "Authentication failed" });
    }
  });

  console.log("[OAuth] Routes registered with Manus OAuth");
}
