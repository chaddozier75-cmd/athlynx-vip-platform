import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getDb } from "./db";
import { users, creditTransactions, creditUsage } from "../drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { invokeLLM } from "./_core/llm";

/**
 * AI Credit costs per action type
 */
export const CREDIT_COSTS = {
  training_plan: 5,
  video_analysis: 10,
  recruiting_email: 3,
  performance_report: 8,
  ai_chat_message: 1,
  scouting_report: 15,
  nil_deal_analysis: 7,
  career_path_planning: 10,
} as const;

/**
 * Get user's current credit balance
 */
export async function getUserCredits(userId: number): Promise<number> {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
  
  const user = await db.select({ aiCredits: users.aiCredits })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  
  return user[0]?.aiCredits ?? 0;
}

/**
 * Deduct credits from user balance
 */
export async function deductCredits(
  userId: number,
  amount: number,
  actionType: string,
  result?: string,
  metadata?: Record<string, any>
): Promise<void> {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
  
  const currentCredits = await getUserCredits(userId);
  
  if (currentCredits < amount) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Insufficient credits. You have ${currentCredits} credits but need ${amount}.`,
    });
  }

  // Deduct credits
  await db.update(users)
    .set({ aiCredits: currentCredits - amount })
    .where(eq(users.id, userId));

  // Log usage
  await db.insert(creditUsage).values({
    userId,
    actionType,
    creditsUsed: amount,
    result: result || null,
    metadata: metadata ? JSON.stringify(metadata) : null,
  });
}

/**
 * Add credits to user balance (for purchases, grants, etc.)
 */
export async function addCredits(
  userId: number,
  amount: number,
  type: "purchase" | "grant" | "refund" | "bonus",
  description?: string,
  stripePaymentId?: string
): Promise<void> {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
  
  const currentCredits = await getUserCredits(userId);

  // Add credits
  await db.update(users)
    .set({ aiCredits: currentCredits + amount })
    .where(eq(users.id, userId));

  // Log transaction
  await db.insert(creditTransactions).values({
    userId,
    amount,
    type,
    description: description || null,
    stripePaymentId: stripePaymentId || null,
  });
}

/**
 * Get user's credit transaction history
 */
export async function getCreditTransactions(userId: number, limit = 50) {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
  
  return await db.select()
    .from(creditTransactions)
    .where(eq(creditTransactions.userId, userId))
    .orderBy(desc(creditTransactions.createdAt))
    .limit(limit);
}

/**
 * Get user's credit usage history
 */
export async function getCreditUsageHistory(userId: number, limit = 50) {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
  
  return await db.select()
    .from(creditUsage)
    .where(eq(creditUsage.userId, userId))
    .orderBy(desc(creditUsage.createdAt))
    .limit(limit);
}

/**
 * Generate training plan using AI
 */
export async function generateTrainingPlan(
  userId: number,
  prompt: string
): Promise<string> {
  const cost = CREDIT_COSTS.training_plan;
  
  // Check credits before calling AI
  const currentCredits = await getUserCredits(userId);
  if (currentCredits < cost) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Insufficient credits. You have ${currentCredits} credits but need ${cost}.`,
    });
  }

  // Call Manus LLM
  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: "You are an expert athletic training coach. Create detailed, personalized training plans based on the athlete's goals, sport, and current fitness level. Include specific exercises, sets, reps, rest periods, and progression strategies.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  const result = typeof content === 'string' ? content : "Failed to generate training plan";

  // Deduct credits and log usage
  await deductCredits(userId, cost, "training_plan", result.substring(0, 500), {
    prompt: prompt.substring(0, 200),
  });

  return result;
}
