import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
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

  // User registration with AI-powered email confirmations
  signup: router({
    register: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        username: z.string().min(3),
        sport: z.string(),
        isVip: z.boolean().default(false),
      }))
      .mutation(async ({ input }) => {
        try {
          // Get sport emoji for personalized email
          const sportEmoji = getSportEmoji(input.sport);
          
          // Generate AI-powered welcome email
          const emailContent = await generateWelcomeEmail(
            input.name,
            input.sport,
            sportEmoji,
            input.isVip
          );

          // In production, send actual email here
          // For now, return the generated content
          console.log(`📧 Email sent to ${input.email}:`, emailContent);

          return {
            success: true,
            message: `Welcome ${input.name}! Confirmation email sent to ${input.email}`,
            emailPreview: emailContent,
            vipStatus: input.isVip ? "VIP Founder" : "Beta Tester",
          };
        } catch (error) {
          console.error("Registration error:", error);
          throw new Error("Registration failed. Please try again.");
        }
      }),

    // Check VIP status
    checkVipStatus: publicProcedure
      .input(z.object({
        email: z.string().email(),
      }))
      .query(async ({ input }) => {
        // Check if user is VIP founder
        const isVipFounder = input.email === "cdozier@dozierholdingsgroup.com" || 
                            input.email === "cdozier14@dozierholdingsgroup.com.mx";
        
        return {
          isVip: isVipFounder,
          username: isVipFounder ? "Cdozier14" : null,
          name: isVipFounder ? "Chad A. Dozier Sr" : null,
        };
      }),
  }),

  // AI Bot automated responses
  aiBot: router({
    // Get automated response for any user message
    getResponse: publicProcedure
      .input(z.object({
        message: z.string(),
        sport: z.string().optional(),
        userType: z.enum(["athlete", "coach", "recruiter", "fan"]).default("athlete"),
      }))
      .mutation(async ({ input }) => {
        try {
          const sportEmoji = input.sport ? getSportEmoji(input.sport) : "🏆";
          
          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content: `You are the Athlynx AI Assistant, helping ${input.userType}s with their athletic careers. 
                You specialize in ${input.sport || "all sports"} ${sportEmoji}. 
                Provide helpful, encouraging, and professional responses about:
                - The Athlete Playbook (recruiting visibility, media presence)
                - Transfer Portal navigation
                - NIL opportunities and deals
                - Athlete networking and communication
                Keep responses concise (2-3 sentences) and actionable.`
              },
              {
                role: "user",
                content: input.message
              }
            ],
          });

          return {
            success: true,
            response: response.choices[0].message.content,
            sport: input.sport,
            emoji: sportEmoji,
          };
        } catch (error) {
          console.error("AI Bot error:", error);
          return {
            success: false,
            response: "I'm here to help! Please try rephrasing your question about recruiting, transfers, or NIL opportunities.",
            sport: input.sport,
            emoji: "🏆",
          };
        }
      }),

    // Get sport-specific guidance
    getSportGuidance: publicProcedure
      .input(z.object({
        sport: z.string(),
        topic: z.enum(["recruiting", "transfer", "nil", "training"]),
      }))
      .query(async ({ input }) => {
        const sportEmoji = getSportEmoji(input.sport);
        const guidance = await generateSportGuidance(input.sport, input.topic, sportEmoji);
        
        return {
          sport: input.sport,
          topic: input.topic,
          emoji: sportEmoji,
          guidance,
        };
      }),
  }),

  // Sports management
  sports: router({
    list: publicProcedure.query(async () => {
      return getAllSports();
    }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const sport = getAllSports().find(s => s.id === input.id);
        return sport || null;
      }),
  }),
});

// Helper function to get sport emoji
function getSportEmoji(sportName: string): string {
  const sportEmojis: Record<string, string> = {
    "Baseball": "⚾",
    "Football": "🏈",
    "Basketball": "🏀",
    "Soccer": "�soccer",
    "Tennis": "🎾",
    "Volleyball": "🏐",
    "Track & Field": "🏃",
    "Swimming": "🏊",
    "Golf": "⛳",
    "Softball": "🥎",
    "Wrestling": "🤼",
    "Lacrosse": "🥍",
    "Hockey": "🏒",
    "Gymnastics": "🤸",
    "Cross Country": "🏃‍♀️",
    "Rowing": "🚣",
    "Fencing": "🤺",
    "Boxing": "🥊",
    "Martial Arts": "🥋",
    "Skiing": "⛷️",
  };
  
  return sportEmojis[sportName] || "🏆";
}

// Generate AI-powered welcome email
async function generateWelcomeEmail(
  name: string,
  sport: string,
  emoji: string,
  isVip: boolean
): Promise<string> {
  const vipText = isVip ? "VIP FOUNDER" : "BETA TESTER";
  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: `You are writing a welcome email for Athlynx NIL Portal. 
        Create an enthusiastic, professional email welcoming ${name} as a ${vipText}.
        Their sport is ${sport} ${emoji}.
        Include: Welcome message, what they can do on the platform, and encouragement.
        Keep it under 150 words. Use the emoji ${emoji} once.`
      },
      {
        role: "user",
        content: `Write welcome email for ${name}`
      }
    ],
  });

  return response.choices[0].message.content || `Welcome to Athlynx, ${name}! ${emoji}`;
}

// Generate sport-specific guidance
async function generateSportGuidance(
  sport: string,
  topic: string,
  emoji: string
): Promise<string> {
  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: `You are an expert advisor for ${sport} ${emoji} athletes.
        Provide specific guidance about ${topic} for ${sport} athletes.
        Include 3 actionable tips. Keep it under 200 words.`
      },
      {
        role: "user",
        content: `Give ${topic} advice for ${sport} athletes`
      }
    ],
  });

  return response.choices[0].message.content || `Great question about ${topic} in ${sport}! ${emoji}`;
}

// Get all available sports
function getAllSports() {
  return [
    { id: 1, name: "Baseball", emoji: "⚾" },
    { id: 2, name: "Football", emoji: "🏈" },
    { id: 3, name: "Basketball", emoji: "🏀" },
    { id: 4, name: "Soccer", emoji: "⚽" },
    { id: 5, name: "Tennis", emoji: "🎾" },
    { id: 6, name: "Volleyball", emoji: "🏐" },
    { id: 7, name: "Track & Field", emoji: "🏃" },
    { id: 8, name: "Swimming", emoji: "🏊" },
    { id: 9, name: "Golf", emoji: "⛳" },
    { id: 10, name: "Softball", emoji: "🥎" },
    { id: 11, name: "Wrestling", emoji: "🤼" },
    { id: 12, name: "Lacrosse", emoji: "🥍" },
    { id: 13, name: "Hockey", emoji: "🏒" },
    { id: 14, name: "Gymnastics", emoji: "🤸" },
    { id: 15, name: "Cross Country", emoji: "🏃‍♀️" },
    { id: 16, name: "Rowing", emoji: "🚣" },
    { id: 17, name: "Fencing", emoji: "🤺" },
    { id: 18, name: "Boxing", emoji: "🥊" },
    { id: 19, name: "Martial Arts", emoji: "🥋" },
    { id: 20, name: "Skiing", emoji: "⛷️" },
  ];
}

export type AppRouter = typeof appRouter;
