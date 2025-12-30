import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { emailVerificationCodes, users } from "../drizzle/schema";
import { eq, and, gt } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { sdk } from "./_core/sdk";

// Generate a random 6-digit code
function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Generate unique openId for email users
function generateOpenId(email: string): string {
  return `email_${Buffer.from(email).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 40)}`;
}

export const emailAuthRouter = router({
  // Send verification code to email
  sendCode: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      const { email } = input;
      const code = generateCode();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      const db = await getDb();
      if (!db) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database not available' });
      }

      // Store the code in database
      await db.insert(emailVerificationCodes).values({
        email: email.toLowerCase(),
        code,
        expiresAt,
      });

      // Log the code for testing (in production, send via email)
      console.log(`[EMAIL AUTH] Verification code for ${email}: ${code}`);

      // Try to send email notification
      try {
        const forgeUrl = process.env.BUILT_IN_FORGE_API_URL;
        const apiKey = process.env.BUILT_IN_FORGE_API_KEY;
        
        if (forgeUrl && apiKey) {
          await fetch(`${forgeUrl}/notification/send`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              to: email,
              subject: '🏆 ATHLYNX - Your Login Code',
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A1628; padding: 40px; border-radius: 16px;">
                  <h1 style="color: #00D9FF; text-align: center;">ATHLYNX</h1>
                  <p style="color: #FCD34D; text-align: center;">THE ATHLETE'S PLAYBOOK</p>
                  <div style="background: rgba(255,255,255,0.1); border-radius: 12px; padding: 30px; text-align: center; margin: 20px 0;">
                    <p style="color: #fff; font-size: 18px;">Your verification code:</p>
                    <div style="background: linear-gradient(135deg, #00D9FF, #0066FF); border-radius: 8px; padding: 20px; display: inline-block; margin: 10px 0;">
                      <span style="color: #fff; font-size: 32px; font-weight: bold; letter-spacing: 8px;">${code}</span>
                    </div>
                    <p style="color: #888; font-size: 14px;">Expires in 10 minutes</p>
                  </div>
                </div>
              `,
            }),
          });
        }
      } catch (e) {
        console.error('[EMAIL AUTH] Failed to send email:', e);
      }

      return { 
        success: true, 
        message: 'Verification code sent! Check your email.',
        // Return code in dev for testing
        devCode: process.env.NODE_ENV !== 'production' ? code : undefined,
      };
    }),

  // Verify code and create session
  verifyCode: publicProcedure
    .input(z.object({ 
      email: z.string().email(),
      code: z.string().length(6)
    }))
    .mutation(async ({ input, ctx }) => {
      const { email, code } = input;
      const now = new Date();

      const db = await getDb();
      if (!db) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database not available' });
      }

      // Find valid code
      const [validCode] = await db
        .select()
        .from(emailVerificationCodes)
        .where(
          and(
            eq(emailVerificationCodes.email, email.toLowerCase()),
            eq(emailVerificationCodes.code, code),
            eq(emailVerificationCodes.used, 'no'),
            gt(emailVerificationCodes.expiresAt, now)
          )
        )
        .limit(1);

      if (!validCode) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid or expired verification code',
        });
      }

      // Mark code as used
      await db
        .update(emailVerificationCodes)
        .set({ used: 'yes' })
        .where(eq(emailVerificationCodes.id, validCode.id));

      // Find or create user
      const openId = generateOpenId(email);
      let [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email.toLowerCase()))
        .limit(1);

      if (!user) {
        // Create new user
        const [result] = await db.insert(users).values({
          openId,
          email: email.toLowerCase(),
          name: email.split('@')[0],
          loginMethod: 'email',
          role: 'user',
        });
        
        [user] = await db
          .select()
          .from(users)
          .where(eq(users.id, result.insertId))
          .limit(1);
      } else {
        // Update last signed in
        await db
          .update(users)
          .set({ lastSignedIn: now })
          .where(eq(users.id, user.id));
      }

      // Create session token using the existing SDK
      const sessionToken = await sdk.createSessionToken(user.openId, {
        name: user.name || email.split('@')[0],
      });

      // Set cookie
      ctx.res.cookie(COOKIE_NAME, sessionToken, getSessionCookieOptions(ctx.req));

      return {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };
    }),
});
