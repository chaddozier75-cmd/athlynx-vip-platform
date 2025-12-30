import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { vipMembers } from "../drizzle/schema";
import { getDb } from "./db";
import { notifyOwner } from "./_core/notification";
import { sendVIPConfirmationEmail } from "./email";
import { createSubscriptionCheckout, createCreditCheckout, getCheckoutSession } from "./stripe/checkout";
import { SUBSCRIPTION_TIERS, AI_CREDIT_PACKS } from "./stripe/products";
import { getUserCredits, getCreditTransactions, getCreditUsageHistory, generateTrainingPlan, generateRecruitingEmail, generateScoutingReport, analyzeNILDeal, generateCareerPath, generatePerformanceReport, handleAIChatMessage, generateSocialContent, matchAthleteToSchools, CREDIT_COSTS } from "./ai-credits";
import { transferPortalRouter } from "./transfer-portal";
import { fcaRouter } from "./fca";
import { storeRouter } from "./store";
import { trainingRouter } from "./training";
import { musicRouter } from "./music";
import { veteransRouter } from "./veterans";
import { careersRouter } from "./careers";
import { medicalRouter } from "./medical";
import { baseballRouter } from "./baseball";
import { partnersRouter } from "./partners";
import { adminRouter } from "./admin";


export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // VIP Early Access Signup
  vip: router({
    signup: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          phone: z.string().optional(),
          role: z.string(),
          sport: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        // Generate unique access code
        const accessCode = Math.random().toString(36).substring(2, 14).toUpperCase();

        // Insert into database
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }
        
        await db.insert(vipMembers).values({
          email: input.email,
          phone: input.phone || null,
          role: input.role,
          sport: input.sport,
          accessCode,
          status: "pending",
        });

        // Send VIP confirmation email with AI-generated content
        await sendVIPConfirmationEmail({
          email: input.email,
          role: input.role,
          sport: input.sport,
          accessCode,
        });

        return {
          success: true,
          accessCode,
        };
      }),
  }),

  // Stripe Payment Routes
  stripe: router({
    // Get subscription tiers info
    getTiers: publicProcedure.query(() => {
      return SUBSCRIPTION_TIERS;
    }),

    // Get AI credit packs info
    getCreditPacks: publicProcedure.query(() => {
      return AI_CREDIT_PACKS;
    }),

    // Create subscription checkout session
    createSubscriptionCheckout: publicProcedure
      .input(
        z.object({
          tier: z.enum(["pro", "elite", "enterprise"]),
          billingPeriod: z.enum(["monthly", "annual"]),
          email: z.string().email(),
          name: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const userId = ctx.user?.id?.toString() || `guest_${Date.now()}`;
        const origin = ctx.req.headers.origin || "http://localhost:3000";

        const { url } = await createSubscriptionCheckout({
          tier: input.tier,
          billingPeriod: input.billingPeriod,
          userId,
          userEmail: input.email,
          userName: input.name,
          origin,
        });

        return { url };
      }),

    // Create AI credits checkout session
    createCreditsCheckout: publicProcedure
      .input(
        z.object({
          pack: z.enum(["pack100", "pack500", "pack1000", "pack5000"]),
          email: z.string().email(),
          name: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const userId = ctx.user?.id?.toString() || `guest_${Date.now()}`;
        const origin = ctx.req.headers.origin || "http://localhost:3000";

        const { url } = await createCreditCheckout({
          pack: input.pack,
          userId,
          userEmail: input.email,
          userName: input.name,
          origin,
        });

        return { url };
      }),

    // Get checkout session details (for success page)
    getSession: publicProcedure
      .input(z.object({ sessionId: z.string() }))
      .query(async ({ input }) => {
        const session = await getCheckoutSession(input.sessionId);
        return {
          id: session.id,
          status: session.status,
          paymentStatus: session.payment_status,
          customerEmail: session.customer_email,
          amountTotal: session.amount_total,
          metadata: session.metadata,
        };
      }),
  }),

  // AI Credits & Bots
  aiCredits: router({
    // Get user's current credit balance
    getBalance: protectedProcedure.query(async ({ ctx }) => {
      const credits = await getUserCredits(ctx.user.id);
      return { credits };
    }),

    // Get credit transaction history
    getTransactions: protectedProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ ctx, input }) => {
        const transactions = await getCreditTransactions(ctx.user.id, input.limit);
        return transactions;
      }),

    // Get credit usage history
    getUsageHistory: protectedProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ ctx, input }) => {
        const usage = await getCreditUsageHistory(ctx.user.id, input.limit);
        return usage;
      }),

    // Get credit costs for all actions
    getCosts: publicProcedure.query(() => {
      return CREDIT_COSTS;
    }),
  }),

  // Transfer Portal Intelligence Platform
  transferPortal: transferPortalRouter,
  fca: fcaRouter,
  store: storeRouter,
  training: trainingRouter,
  music: musicRouter,
  veterans: veteransRouter,
  careers: careersRouter,
  medical: medicalRouter,
  baseball: baseballRouter,
  partners: partnersRouter,
  admin: adminRouter,

  // AI Bots - TRUE AI AUTOMATION
  aiBots: router({
    // Generate training plan
    generateTrainingPlan: protectedProcedure
      .input(z.object({ prompt: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const result = await generateTrainingPlan(ctx.user.id, input.prompt);
        return { result };
      }),

    // Generate recruiting email
    generateRecruitingEmail: protectedProcedure
      .input(z.object({
        name: z.string(),
        sport: z.string(),
        position: z.string(),
        stats: z.string(),
        targetSchool: z.string(),
        coachName: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const result = await generateRecruitingEmail(ctx.user.id, input);
        return { result };
      }),

    // Generate scouting report
    generateScoutingReport: protectedProcedure
      .input(z.object({
        name: z.string(),
        sport: z.string(),
        position: z.string(),
        stats: z.string(),
        highlights: z.string().optional(),
        weaknesses: z.string().optional(),
        coachNotes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const result = await generateScoutingReport(ctx.user.id, input);
        return { result };
      }),

    // Analyze NIL deal
    analyzeNILDeal: protectedProcedure
      .input(z.object({
        brandName: z.string(),
        dealType: z.string(),
        compensation: z.string(),
        duration: z.string(),
        requirements: z.string(),
        athleteFollowers: z.string().optional(),
        athleteSport: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const result = await analyzeNILDeal(ctx.user.id, input);
        return result;
      }),

    // Generate career path
    generateCareerPath: protectedProcedure
      .input(z.object({
        name: z.string(),
        age: z.number(),
        sport: z.string(),
        position: z.string(),
        currentLevel: z.string(),
        goals: z.string(),
        strengths: z.string().optional(),
        challenges: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const result = await generateCareerPath(ctx.user.id, input);
        return { result };
      }),

    // Generate performance report
    generatePerformanceReport: protectedProcedure
      .input(z.object({
        athleteName: z.string(),
        sport: z.string(),
        position: z.string(),
        recentStats: z.string(),
        previousStats: z.string().optional(),
        injuryHistory: z.string().optional(),
        trainingNotes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const result = await generatePerformanceReport(ctx.user.id, input);
        return { result };
      }),

    // AI Chat
    chat: protectedProcedure
      .input(z.object({
        message: z.string(),
        conversationHistory: z.array(z.object({
          role: z.enum(['user', 'assistant']),
          content: z.string(),
        })).default([]),
      }))
      .mutation(async ({ ctx, input }) => {
        const result = await handleAIChatMessage(ctx.user.id, input.message, input.conversationHistory);
        return { result };
      }),

    // Generate social media content
    generateSocialContent: protectedProcedure
      .input(z.object({
        platform: z.enum(['twitter', 'instagram', 'linkedin', 'tiktok']),
        topic: z.string(),
        tone: z.enum(['professional', 'casual', 'motivational', 'informative']),
        athleteInfo: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const result = await generateSocialContent(ctx.user.id, input);
        return result;
      }),

    // Match athlete to schools
    matchToSchools: protectedProcedure
      .input(z.object({
        sport: z.string(),
        position: z.string(),
        gpa: z.number(),
        testScores: z.string().optional(),
        stats: z.string(),
        preferences: z.string(),
        location: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const matches = await matchAthleteToSchools(ctx.user.id, input);
        return { matches };
      }),
  }),
});

export type AppRouter = typeof appRouter;
