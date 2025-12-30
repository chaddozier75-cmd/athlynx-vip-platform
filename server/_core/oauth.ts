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

      if (!code) {
        return res.status(400).json({ error: "Missing authorization code" });
      }

      // Exchange code for token using Manus OAuth
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
        console.error("[OAuth] Token exchange failed:", errorText);
        return res.status(401).json({ error: "Authentication failed" });
      }

      const tokenData = await tokenResponse.json();
      const { user } = tokenData;

      if (!user || !user.open_id) {
        return res.status(401).json({ error: "Invalid user data from OAuth" });
      }

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

      // Create session token using SDK
      const sessionToken = await sdk.createSessionToken(user.open_id, {
        name: user.name || dbUser?.name || "User",
      });

      // Set cookie
      res.cookie(COOKIE_NAME, sessionToken, getSessionCookieOptions(req));

      // Redirect to the state URL or home
      const redirectUrl = state ? decodeURIComponent(state) : "/";
      res.redirect(redirectUrl);
    } catch (error) {
      console.error("[OAuth] Callback error:", error);
      res.status(500).json({ error: "Authentication failed" });
    }
  });

  console.log("[OAuth] Routes registered with Manus OAuth");
}
