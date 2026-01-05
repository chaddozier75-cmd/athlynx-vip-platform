import { invokeLLM } from "./_core/llm";
import { db } from "./db";
import { users, aiConversations, athleteProfiles } from "../drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * ATHLYNX AI BOT ECOSYSTEM
 * Based on Fuel Bots documentation
 * 
 * 10+ AI BOTS:
 * 1. Sales Wizard - Converts leads to paying customers
 * 2. Recruiting Companion - Helps athletes navigate recruiting
 * 3. Training Assistant - Personalized workout plans
 * 4. NIL Deal Matcher - AI-powered brand matching
 * 5. Compliance Guardian - Ensures NIL compliance
 * 6. Contract Analyzer - Reviews NIL contracts
 * 7. Social Media Coach - Optimizes athlete social presence
 * 8. Performance Analyst - Analyzes game film and stats
 * 9. Career Advisor - Long-term career planning
 * 10. Mental Performance Coach - Mental health support
 */

// BOT 1: SALES WIZARD
export async function salesWizardBot(
  leadName: string,
  leadEmail: string,
  leadType: "athlete" | "school" | "brand" | "collective",
  context?: string
) {
  const systemPrompt = `You are the Athlynx Sales Wizard, an expert at converting leads into paying customers.

Your goal: Convert ${leadType} leads into subscriptions.

Pricing for ${leadType}:
${leadType === "athlete" ? "- Premium: $99/month or $990/year (2 months free)" : ""}
${leadType === "school" ? "- School Subscription: $100K/year or $8,500/month" : ""}
${leadType === "brand" ? "- Brand Subscription: $25K/year or $2,100/month" : ""}
${leadType === "collective" ? "- Collective Subscription: $50K/year or $4,200/month" : ""}

Key selling points:
- All-in-one platform (6 apps in 1)
- Lower transaction fees (15% vs 20-30% industry)
- AI-powered matching
- HIPAA-compliant messaging
- Compliance tools built-in
- $500M+ revenue potential ecosystem

Be consultative, not pushy. Focus on solving their problems.`;

  const userPrompt = `Lead: ${leadName} (${leadEmail})
Type: ${leadType}
${context ? `Context: ${context}` : ""}

Generate a personalized outreach message that will convert this lead.`;

  const response = await invokeLLM({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  return response.choices[0]?.message?.content || "";
}

// BOT 2: RECRUITING COMPANION
export async function recruitingCompanionBot(
  athleteId: number,
  question: string,
  athleteContext?: any
) {
  const systemPrompt = `You are the Athlynx Recruiting Companion, an expert college recruiting advisor.

You help high school athletes navigate the recruiting process with:
- NCAA eligibility rules
- Division I, II, III differences
- Scholarship opportunities
- Transfer portal navigation
- Official visit preparation
- Commitment timing strategies

Be supportive, knowledgeable, and always compliant with NCAA rules.`;

  const userPrompt = `Athlete Question: ${question}

${athleteContext ? `Athlete Profile:
- Sport: ${athleteContext.sport}
- Position: ${athleteContext.position}
- GPA: ${athleteContext.gpa}
- Class Year: ${athleteContext.classYear}
` : ""}

Provide expert recruiting advice.`;

  const response = await invokeLLM({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  // Store conversation
  await db.insert(aiConversations).values({
    userId: athleteId,
    botType: "recruiting_companion",
    userMessage: question,
    botResponse: response.choices[0]?.message?.content || "",
  });

  return response.choices[0]?.message?.content || "";
}

// BOT 3: TRAINING ASSISTANT
export async function trainingAssistantBot(
  athleteId: number,
  sport: string,
  position: string,
  goal: string,
  currentLevel: string
) {
  const systemPrompt = `You are the Athlynx Training Assistant, an expert strength and conditioning coach.

You create personalized training plans for athletes based on:
- Sport-specific demands
- Position requirements
- Current fitness level
- Performance goals
- Injury prevention

Provide detailed, actionable workout plans with:
- Exercise selection
- Sets and reps
- Rest periods
- Progression strategies
- Recovery protocols`;

  const userPrompt = `Create a training plan for:
- Sport: ${sport}
- Position: ${position}
- Goal: ${goal}
- Current Level: ${currentLevel}

Provide a 4-week progressive training plan.`;

  const response = await invokeLLM({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  // Store training plan
  await db.insert(aiConversations).values({
    userId: athleteId,
    botType: "training_assistant",
    userMessage: userPrompt,
    botResponse: response.choices[0]?.message?.content || "",
  });

  return response.choices[0]?.message?.content || "";
}

// BOT 4: NIL DEAL MATCHER
export async function nilDealMatcherBot(
  athleteId: number,
  athleteProfile: any,
  availableDeals: any[]
) {
  const systemPrompt = `You are the Athlynx NIL Deal Matcher, an AI-powered brand partnership expert.

You analyze athlete profiles and match them with the best NIL opportunities based on:
- Follower count and engagement rate
- Sport and position
- Personal brand alignment
- Geographic location
- Audience demographics
- Past partnership performance

Provide match scores (0-100) and detailed reasoning for each recommendation.`;

  const userPrompt = `Athlete Profile:
- Name: ${athleteProfile.name}
- Sport: ${athleteProfile.sport}
- Followers: ${athleteProfile.followers}
- Engagement Rate: ${athleteProfile.engagementRate}%
- Location: ${athleteProfile.location}
- Brand Values: ${athleteProfile.brandValues}

Available NIL Deals:
${availableDeals.map((deal, i) => `
${i + 1}. ${deal.brandName}
   - Deal Value: $${deal.value}
   - Requirements: ${deal.requirements}
   - Target Audience: ${deal.targetAudience}
`).join("\n")}

Rank these deals by match score and explain why.`;

  const response = await invokeLLM({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  return response.choices[0]?.message?.content || "";
}

// BOT 5: COMPLIANCE GUARDIAN
export async function complianceGuardianBot(
  dealDetails: any,
  state: string,
  schoolName: string
) {
  const systemPrompt = `You are the Athlynx Compliance Guardian, an expert in NIL compliance.

You ensure all NIL activities comply with:
- NCAA rules and regulations
- State-specific NIL laws
- School-specific policies
- Tax implications
- Contract requirements

Provide clear compliance guidance with:
- Green light (compliant)
- Yellow light (needs review)
- Red light (non-compliant)

Always cite specific rules and regulations.`;

  const userPrompt = `Review this NIL deal for compliance:

Deal Details:
- Brand: ${dealDetails.brandName}
- Value: $${dealDetails.value}
- Duration: ${dealDetails.duration}
- Deliverables: ${dealDetails.deliverables}
- Payment Structure: ${dealDetails.paymentStructure}

Context:
- State: ${state}
- School: ${schoolName}
- Athlete Status: Active NCAA athlete

Provide compliance assessment.`;

  const response = await invokeLLM({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  return response.choices[0]?.message?.content || "";
}

// BOT 6: CONTRACT ANALYZER
export async function contractAnalyzerBot(
  contractText: string,
  athleteId: number
) {
  const systemPrompt = `You are the Athlynx Contract Analyzer, an expert in NIL contract review.

You analyze contracts for:
- Fair compensation
- Reasonable deliverables
- Exclusivity clauses
- Termination rights
- Intellectual property rights
- Payment terms
- Red flags

Provide a detailed analysis with:
- Overall assessment (Good/Fair/Poor)
- Key terms summary
- Potential issues
- Negotiation recommendations`;

  const userPrompt = `Analyze this NIL contract:

${contractText}

Provide a comprehensive contract analysis.`;

  const response = await invokeLLM({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  // Store analysis
  await db.insert(aiConversations).values({
    userId: athleteId,
    botType: "contract_analyzer",
    userMessage: "Contract analysis request",
    botResponse: response.choices[0]?.message?.content || "",
  });

  return response.choices[0]?.message?.content || "";
}

// BOT 7: SOCIAL MEDIA COACH
export async function socialMediaCoachBot(
  athleteId: number,
  platform: string,
  currentMetrics: any,
  goals: string
) {
  const systemPrompt = `You are the Athlynx Social Media Coach, an expert in athlete personal branding.

You help athletes:
- Grow their following
- Increase engagement
- Create compelling content
- Build their personal brand
- Attract NIL opportunities

Provide actionable strategies with specific tactics and examples.`;

  const userPrompt = `Help this athlete improve their ${platform} presence:

Current Metrics:
- Followers: ${currentMetrics.followers}
- Engagement Rate: ${currentMetrics.engagementRate}%
- Average Likes: ${currentMetrics.avgLikes}
- Average Comments: ${currentMetrics.avgComments}
- Post Frequency: ${currentMetrics.postFrequency}

Goals: ${goals}

Provide a 30-day social media growth plan.`;

  const response = await invokeLLM({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  return response.choices[0]?.message?.content || "";
}

// BOT 8: PERFORMANCE ANALYST
export async function performanceAnalystBot(
  athleteId: number,
  sport: string,
  stats: any,
  gameFilmUrl?: string
) {
  const systemPrompt = `You are the Athlynx Performance Analyst, an expert in athletic performance analysis.

You analyze:
- Game statistics
- Performance trends
- Strengths and weaknesses
- Improvement opportunities
- Recruiting profile enhancement

Provide data-driven insights with specific recommendations.`;

  const userPrompt = `Analyze this athlete's performance:

Sport: ${sport}

Stats:
${JSON.stringify(stats, null, 2)}

${gameFilmUrl ? `Game Film: ${gameFilmUrl}` : ""}

Provide performance analysis and improvement recommendations.`;

  const response = await invokeLLM({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  return response.choices[0]?.message?.content || "";
}

// BOT 9: CAREER ADVISOR
export async function careerAdvisorBot(
  athleteId: number,
  sport: string,
  academicMajor: string,
  careerInterests: string[]
) {
  const systemPrompt = `You are the Athlynx Career Advisor, an expert in athlete career development.

You help athletes plan for life after sports:
- Professional sports opportunities
- Career transition strategies
- Networking opportunities
- Skill development
- Personal brand monetization
- Entrepreneurship

Provide comprehensive career guidance with actionable steps.`;

  const userPrompt = `Provide career advice for this athlete:

Sport: ${sport}
Academic Major: ${academicMajor}
Career Interests: ${careerInterests.join(", ")}

Create a 5-year career development plan.`;

  const response = await invokeLLM({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  return response.choices[0]?.message?.content || "";
}

// BOT 10: MENTAL PERFORMANCE COACH
export async function mentalPerformanceCoachBot(
  athleteId: number,
  challenge: string,
  context?: string
) {
  const systemPrompt = `You are the Athlynx Mental Performance Coach, an expert in sports psychology.

You help athletes with:
- Performance anxiety
- Confidence building
- Focus and concentration
- Stress management
- Goal setting
- Visualization techniques
- Resilience training

Provide supportive, evidence-based mental performance strategies.

IMPORTANT: If the athlete mentions serious mental health concerns (depression, self-harm, etc.), 
recommend they speak with a licensed mental health professional.`;

  const userPrompt = `Athlete Challenge: ${challenge}

${context ? `Context: ${context}` : ""}

Provide mental performance coaching.`;

  const response = await invokeLLM({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  // Store conversation
  await db.insert(aiConversations).values({
    userId: athleteId,
    botType: "mental_performance_coach",
    userMessage: challenge,
    botResponse: response.choices[0]?.message?.content || "",
  });

  return response.choices[0]?.message?.content || "";
}

/**
 * Get bot usage statistics
 */
export async function getBotUsageStats(userId?: number) {
  const query = userId
    ? db.query.aiConversations.findMany({
        where: eq(aiConversations.userId, userId),
      })
    : db.query.aiConversations.findMany();

  const conversations = await query;

  const stats = {
    totalConversations: conversations.length,
    byBotType: {} as Record<string, number>,
    averageResponseTime: 0,
  };

  conversations.forEach((conv) => {
    const botType = conv.botType || "unknown";
    stats.byBotType[botType] = (stats.byBotType[botType] || 0) + 1;
  });

  return stats;
}

export default {
  salesWizardBot,
  recruitingCompanionBot,
  trainingAssistantBot,
  nilDealMatcherBot,
  complianceGuardianBot,
  contractAnalyzerBot,
  socialMediaCoachBot,
  performanceAnalystBot,
  careerAdvisorBot,
  mentalPerformanceCoachBot,
  getBotUsageStats,
};
