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


/**
 * Generate recruiting email using AI
 */
export async function generateRecruitingEmail(
  userId: number,
  athleteInfo: {
    name: string;
    sport: string;
    position: string;
    stats: string;
    targetSchool: string;
    coachName?: string;
  }
): Promise<string> {
  const cost = CREDIT_COSTS.recruiting_email;
  
  const currentCredits = await getUserCredits(userId);
  if (currentCredits < cost) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Insufficient credits. You have ${currentCredits} credits but need ${cost}.`,
    });
  }

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: `You are an expert college recruiting consultant. Write compelling, professional recruiting emails that highlight the athlete's strengths and express genuine interest in the program. Keep emails concise but impactful. Include specific stats and achievements. Be respectful of the coach's time.`,
      },
      {
        role: "user",
        content: `Write a recruiting email for:
- Athlete: ${athleteInfo.name}
- Sport: ${athleteInfo.sport}
- Position: ${athleteInfo.position}
- Key Stats: ${athleteInfo.stats}
- Target School: ${athleteInfo.targetSchool}
${athleteInfo.coachName ? `- Coach: ${athleteInfo.coachName}` : ''}

Make it professional, personalized, and compelling.`,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  const result = typeof content === 'string' ? content : "Failed to generate recruiting email";

  await deductCredits(userId, cost, "recruiting_email", result.substring(0, 500), {
    targetSchool: athleteInfo.targetSchool,
    sport: athleteInfo.sport,
  });

  return result;
}

/**
 * Generate scouting report using AI
 */
export async function generateScoutingReport(
  userId: number,
  athleteData: {
    name: string;
    sport: string;
    position: string;
    stats: string;
    highlights?: string;
    weaknesses?: string;
    coachNotes?: string;
  }
): Promise<string> {
  const cost = CREDIT_COSTS.scouting_report;
  
  const currentCredits = await getUserCredits(userId);
  if (currentCredits < cost) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Insufficient credits. You have ${currentCredits} credits but need ${cost}.`,
    });
  }

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: `You are a professional sports scout with 20+ years of experience. Generate comprehensive scouting reports that evaluate athletes objectively. Include:
- Physical attributes assessment
- Technical skills breakdown
- Mental/intangibles evaluation
- Projection and ceiling
- Areas for improvement
- Comparison to similar players
- Overall grade and recommendation
Use professional scouting terminology and be honest but constructive.`,
      },
      {
        role: "user",
        content: `Generate a detailed scouting report for:
- Name: ${athleteData.name}
- Sport: ${athleteData.sport}
- Position: ${athleteData.position}
- Statistics: ${athleteData.stats}
${athleteData.highlights ? `- Highlights: ${athleteData.highlights}` : ''}
${athleteData.weaknesses ? `- Known weaknesses: ${athleteData.weaknesses}` : ''}
${athleteData.coachNotes ? `- Coach notes: ${athleteData.coachNotes}` : ''}`,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  const result = typeof content === 'string' ? content : "Failed to generate scouting report";

  await deductCredits(userId, cost, "scouting_report", result.substring(0, 500), {
    athleteName: athleteData.name,
    sport: athleteData.sport,
  });

  return result;
}

/**
 * Analyze NIL deal using AI
 */
export async function analyzeNILDeal(
  userId: number,
  dealInfo: {
    brandName: string;
    dealType: string;
    compensation: string;
    duration: string;
    requirements: string;
    athleteFollowers?: string;
    athleteSport?: string;
  }
): Promise<{ analysis: string; recommendation: string; riskLevel: string; estimatedValue: string }> {
  const cost = CREDIT_COSTS.nil_deal_analysis;
  
  const currentCredits = await getUserCredits(userId);
  if (currentCredits < cost) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Insufficient credits. You have ${currentCredits} credits but need ${cost}.`,
    });
  }

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: `You are an expert NIL (Name, Image, Likeness) deal analyst and sports attorney. Analyze NIL deals for college athletes and provide:
- Fair market value assessment
- Risk analysis
- Contract red flags
- Negotiation recommendations
- Comparison to industry standards
Be thorough but practical. Protect the athlete's interests.`,
      },
      {
        role: "user",
        content: `Analyze this NIL deal:
- Brand: ${dealInfo.brandName}
- Deal Type: ${dealInfo.dealType}
- Compensation: ${dealInfo.compensation}
- Duration: ${dealInfo.duration}
- Requirements: ${dealInfo.requirements}
${dealInfo.athleteFollowers ? `- Athlete's social following: ${dealInfo.athleteFollowers}` : ''}
${dealInfo.athleteSport ? `- Sport: ${dealInfo.athleteSport}` : ''}

Provide analysis, recommendation (accept/negotiate/decline), risk level (low/medium/high), and estimated fair value.

Return as JSON:
{
  "analysis": "detailed analysis",
  "recommendation": "accept/negotiate/decline",
  "riskLevel": "low/medium/high",
  "estimatedValue": "fair market value estimate"
}`,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "nil_analysis",
        strict: true,
        schema: {
          type: "object",
          properties: {
            analysis: { type: "string" },
            recommendation: { type: "string" },
            riskLevel: { type: "string" },
            estimatedValue: { type: "string" },
          },
          required: ["analysis", "recommendation", "riskLevel", "estimatedValue"],
          additionalProperties: false,
        },
      },
    },
  });

  const content = response.choices[0]?.message?.content;
  let result = {
    analysis: "Unable to analyze deal",
    recommendation: "consult professional",
    riskLevel: "unknown",
    estimatedValue: "N/A",
  };

  if (typeof content === 'string') {
    try {
      result = JSON.parse(content);
    } catch (e) {
      result.analysis = content;
    }
  }

  await deductCredits(userId, cost, "nil_deal_analysis", JSON.stringify(result).substring(0, 500), {
    brandName: dealInfo.brandName,
    dealType: dealInfo.dealType,
  });

  return result;
}

/**
 * Generate career path plan using AI
 */
export async function generateCareerPath(
  userId: number,
  athleteInfo: {
    name: string;
    age: number;
    sport: string;
    position: string;
    currentLevel: string;
    goals: string;
    strengths?: string;
    challenges?: string;
  }
): Promise<string> {
  const cost = CREDIT_COSTS.career_path_planning;
  
  const currentCredits = await getUserCredits(userId);
  if (currentCredits < cost) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Insufficient credits. You have ${currentCredits} credits but need ${cost}.`,
    });
  }

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: `You are a sports career counselor and athlete development expert. Create comprehensive career path plans that include:
- Short-term goals (6 months)
- Medium-term goals (1-2 years)
- Long-term goals (3-5 years)
- Specific action steps
- Milestones and benchmarks
- Alternative paths if primary goal isn't achieved
- Resources and contacts needed
- Financial planning considerations
Be realistic but encouraging. Consider both athletic and post-athletic careers.`,
      },
      {
        role: "user",
        content: `Create a career path plan for:
- Name: ${athleteInfo.name}
- Age: ${athleteInfo.age}
- Sport: ${athleteInfo.sport}
- Position: ${athleteInfo.position}
- Current Level: ${athleteInfo.currentLevel}
- Goals: ${athleteInfo.goals}
${athleteInfo.strengths ? `- Strengths: ${athleteInfo.strengths}` : ''}
${athleteInfo.challenges ? `- Challenges: ${athleteInfo.challenges}` : ''}`,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  const result = typeof content === 'string' ? content : "Failed to generate career path";

  await deductCredits(userId, cost, "career_path_planning", result.substring(0, 500), {
    sport: athleteInfo.sport,
    currentLevel: athleteInfo.currentLevel,
  });

  return result;
}

/**
 * Generate performance report using AI
 */
export async function generatePerformanceReport(
  userId: number,
  performanceData: {
    athleteName: string;
    sport: string;
    position: string;
    recentStats: string;
    previousStats?: string;
    injuryHistory?: string;
    trainingNotes?: string;
  }
): Promise<string> {
  const cost = CREDIT_COSTS.performance_report;
  
  const currentCredits = await getUserCredits(userId);
  if (currentCredits < cost) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Insufficient credits. You have ${currentCredits} credits but need ${cost}.`,
    });
  }

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: `You are a sports performance analyst. Generate comprehensive performance reports that include:
- Statistical analysis and trends
- Strengths and areas of excellence
- Areas needing improvement
- Comparison to position averages
- Specific recommendations for improvement
- Training focus areas
- Mental performance notes
Use data-driven insights and actionable recommendations.`,
      },
      {
        role: "user",
        content: `Generate a performance report for:
- Athlete: ${performanceData.athleteName}
- Sport: ${performanceData.sport}
- Position: ${performanceData.position}
- Recent Stats: ${performanceData.recentStats}
${performanceData.previousStats ? `- Previous Stats: ${performanceData.previousStats}` : ''}
${performanceData.injuryHistory ? `- Injury History: ${performanceData.injuryHistory}` : ''}
${performanceData.trainingNotes ? `- Training Notes: ${performanceData.trainingNotes}` : ''}`,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  const result = typeof content === 'string' ? content : "Failed to generate performance report";

  await deductCredits(userId, cost, "performance_report", result.substring(0, 500), {
    athleteName: performanceData.athleteName,
    sport: performanceData.sport,
  });

  return result;
}

/**
 * AI Chat message handler
 */
export async function handleAIChatMessage(
  userId: number,
  message: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>
): Promise<string> {
  const cost = CREDIT_COSTS.ai_chat_message;
  
  const currentCredits = await getUserCredits(userId);
  if (currentCredits < cost) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Insufficient credits. You have ${currentCredits} credits but need ${cost}.`,
    });
  }

  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    {
      role: "system",
      content: `You are ATHLYNX AI, a helpful assistant for athletes, parents, coaches, and sports professionals. You help with:
- Training and workout advice
- Recruiting guidance
- NIL (Name, Image, Likeness) questions
- Transfer portal navigation
- Career planning
- Mental performance
- Sports nutrition
- Injury prevention

Be encouraging, knowledgeable, and supportive. Always prioritize the athlete's well-being and long-term success. If you don't know something, admit it and suggest consulting a professional.`,
    },
    ...conversationHistory.map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    })),
    {
      role: "user" as const,
      content: message,
    },
  ];

  const response = await invokeLLM({ messages });

  const content = response.choices[0]?.message?.content;
  const result = typeof content === 'string' ? content : "I apologize, I couldn't process that request. Please try again.";

  await deductCredits(userId, cost, "ai_chat_message", result.substring(0, 200), {
    messageLength: message.length,
  });

  return result;
}

/**
 * Generate social media content using AI
 */
export async function generateSocialContent(
  userId: number,
  contentRequest: {
    platform: 'twitter' | 'instagram' | 'linkedin' | 'tiktok';
    topic: string;
    tone: 'professional' | 'casual' | 'motivational' | 'informative';
    athleteInfo?: string;
  }
): Promise<{ content: string; hashtags: string[] }> {
  const cost = 2; // 2 credits for social content
  
  const currentCredits = await getUserCredits(userId);
  if (currentCredits < cost) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Insufficient credits. You have ${currentCredits} credits but need ${cost}.`,
    });
  }

  const platformGuidelines: Record<string, string> = {
    twitter: "Keep it under 280 characters. Be punchy and engaging.",
    instagram: "Can be longer. Focus on storytelling. Include emoji strategically.",
    linkedin: "Professional tone. Focus on achievements and insights.",
    tiktok: "Casual, trendy. Hook in first line. Use popular phrases.",
  };

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: `You are a social media expert for athletes. Create engaging content that builds personal brand and connects with fans. ${platformGuidelines[contentRequest.platform]}`,
      },
      {
        role: "user",
        content: `Create a ${contentRequest.platform} post about: ${contentRequest.topic}
Tone: ${contentRequest.tone}
${contentRequest.athleteInfo ? `Athlete context: ${contentRequest.athleteInfo}` : ''}

Return as JSON:
{
  "content": "the post content",
  "hashtags": ["relevant", "hashtags"]
}`,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "social_content",
        strict: true,
        schema: {
          type: "object",
          properties: {
            content: { type: "string" },
            hashtags: { type: "array", items: { type: "string" } },
          },
          required: ["content", "hashtags"],
          additionalProperties: false,
        },
      },
    },
  });

  const content = response.choices[0]?.message?.content;
  let result = { content: "Unable to generate content", hashtags: [] as string[] };

  if (typeof content === 'string') {
    try {
      result = JSON.parse(content);
    } catch (e) {
      result.content = content;
    }
  }

  await deductCredits(userId, cost, "social_content", result.content.substring(0, 200), {
    platform: contentRequest.platform,
    topic: contentRequest.topic,
  });

  return result;
}

/**
 * AI-powered athlete matching for recruiting
 */
export async function matchAthleteToSchools(
  userId: number,
  athleteProfile: {
    sport: string;
    position: string;
    gpa: number;
    testScores?: string;
    stats: string;
    preferences: string;
    location?: string;
  }
): Promise<Array<{ school: string; matchScore: number; reason: string }>> {
  const cost = 10; // 10 credits for matching
  
  const currentCredits = await getUserCredits(userId);
  if (currentCredits < cost) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Insufficient credits. You have ${currentCredits} credits but need ${cost}.`,
    });
  }

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: `You are a college recruiting expert. Match athletes to schools based on:
- Athletic ability and stats
- Academic requirements (GPA, test scores)
- Program competitiveness
- Geographic preferences
- Playing time opportunities
- Scholarship availability
Provide realistic matches across D1, D2, D3, NAIA, and JUCO levels.`,
      },
      {
        role: "user",
        content: `Find the best school matches for this athlete:
- Sport: ${athleteProfile.sport}
- Position: ${athleteProfile.position}
- GPA: ${athleteProfile.gpa}
${athleteProfile.testScores ? `- Test Scores: ${athleteProfile.testScores}` : ''}
- Stats: ${athleteProfile.stats}
- Preferences: ${athleteProfile.preferences}
${athleteProfile.location ? `- Location preference: ${athleteProfile.location}` : ''}

Return top 10 matches as JSON array:
[
  { "school": "School Name", "matchScore": 85, "reason": "why this is a good match" }
]`,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "school_matches",
        strict: true,
        schema: {
          type: "object",
          properties: {
            matches: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  school: { type: "string" },
                  matchScore: { type: "number" },
                  reason: { type: "string" },
                },
                required: ["school", "matchScore", "reason"],
                additionalProperties: false,
              },
            },
          },
          required: ["matches"],
          additionalProperties: false,
        },
      },
    },
  });

  const content = response.choices[0]?.message?.content;
  let result: Array<{ school: string; matchScore: number; reason: string }> = [];

  if (typeof content === 'string') {
    try {
      const parsed = JSON.parse(content);
      result = parsed.matches || [];
    } catch (e) {
      console.error("Failed to parse school matches:", e);
    }
  }

  await deductCredits(userId, cost, "athlete_matching", JSON.stringify(result).substring(0, 500), {
    sport: athleteProfile.sport,
    matchCount: result.length,
  });

  return result;
}
