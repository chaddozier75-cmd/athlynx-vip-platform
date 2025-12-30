import { COOKIE_NAME } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { sdk } from "./sdk";
import { ENV } from "./env";
import { notifyOwner } from "./notification";

// Founding Partners - notify owner on login
const FOUNDING_PARTNERS = [
  { email: "cdozier14@athlynx.ai", name: "Chad A. Dozier Sr.", title: "Founder/CEO", partner: "FP-001" },
  { email: "cdozier@dozierholdingsgroup.com", name: "Chad A. Dozier Sr.", title: "Founder/CEO", partner: "FP-001" },
  { email: "chad.dozier@icloud.com", name: "Chad A. Dozier Sr.", title: "Founder/CEO", partner: "FP-001" },
  { email: "chaddozier75@gmail.com", name: "Chad A. Dozier Sr.", title: "Founder/CEO", partner: "FP-001" },
  { email: "leronious@gmail.com", name: "Lee Marshall", title: "VP of Sales & Partnerships", partner: "FP-003" },
  { email: "gtse@dozierholdingsgroup.com", name: "Glenn Tse", title: "CFO & COO", partner: "FP-004" },
  { email: "Jboydbamabayou@yahoo.com", name: "Jimmy Boyd", title: "VP of Real Estate", partner: "FP-005" },
  { email: "akustes@dozierholdingsgroup.com", name: "Andrew Kustes", title: "VP of Technology", partner: "FP-006" },
  { email: "david.ford@aocmedicalllc.com", name: "David R. Ford Sr.", title: "Trusted Advisor", partner: "TA-001" },
];

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

      // Check if this is a founding partner login and notify owner
      const userEmail = user.email?.toLowerCase() || "";
      const foundingPartner = FOUNDING_PARTNERS.find(p => p.email.toLowerCase() === userEmail);
      
      if (foundingPartner) {
        const timestamp = new Date().toLocaleString('en-US', { 
          timeZone: 'America/Chicago',
          dateStyle: 'full',
          timeStyle: 'long'
        });
        
        await notifyOwner({
          title: `🚀 FOUNDING PARTNER LOGIN: ${foundingPartner.name}`,
          content: `**${foundingPartner.name}** (${foundingPartner.partner}) just logged into ATHLYNX!\n\n**Title:** ${foundingPartner.title}\n**Email:** ${userEmail}\n**Timestamp:** ${timestamp}\n\n🦁 Lions Not Sheep`
        });
        
        console.log(`[LOGIN ALERT] Founding Partner ${foundingPartner.name} (${foundingPartner.partner}) logged in at ${timestamp}`);
      }

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
