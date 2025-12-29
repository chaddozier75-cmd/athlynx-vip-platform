/**
 * Email Service for ATHLYNX
 * Uses Manus notification system and LLM for AI-generated emails
 */

import { invokeLLM } from "./_core/llm";
import { notifyOwner } from "./_core/notification";
import { ENV } from "./_core/env";

export interface EmailTemplate {
  subject: string;
  htmlBody: string;
  textBody: string;
}

export interface VIPSignupEmailData {
  email: string;
  name?: string;
  role: string;
  sport: string;
  accessCode: string;
}

/**
 * Generate VIP welcome email with access code using AI
 */
export async function generateVIPWelcomeEmail(data: VIPSignupEmailData): Promise<EmailTemplate> {
  const sportEmojis: Record<string, string> = {
    baseball: "⚾",
    basketball: "🏀",
    football: "🏈",
    soccer: "⚽",
    hockey: "🏒",
    volleyball: "🏐",
    track: "🏃",
    swimming: "🏊",
    wrestling: "🤼",
    tennis: "🎾",
    lacrosse: "🥍",
    golf: "⛳",
    softball: "🥎",
    other: "🏆",
  };

  const sportEmoji = sportEmojis[data.sport.toLowerCase()] || "🏆";
  const userName = data.name || "Athlete";

  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are an email copywriter for ATHLYNX, the premier NIL platform for student athletes. 
Write professional, exciting welcome emails that make athletes feel valued and excited about their VIP access.
Always include the access code prominently. Keep emails concise but impactful.`,
        },
        {
          role: "user",
          content: `Generate a VIP welcome email for:
- Name: ${userName}
- Role: ${data.role}
- Sport: ${data.sport} ${sportEmoji}
- Access Code: ${data.accessCode}

The email should:
1. Welcome them as a VIP founding member
2. Display their unique access code prominently (they'll need this!)
3. Mention the Feb 1, 2026 launch date
4. Highlight they're part of an exclusive group
5. List key features: Diamond Grind, Transfer Portal, NIL Marketplace, AI Training
6. Include a call-to-action
7. Be enthusiastic but professional

Return ONLY valid JSON with this structure:
{
  "subject": "email subject line",
  "htmlBody": "full HTML email body",
  "textBody": "plain text version"
}`,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "email_template",
          strict: true,
          schema: {
            type: "object",
            properties: {
              subject: { type: "string", description: "Email subject line" },
              htmlBody: { type: "string", description: "Full HTML email body" },
              textBody: { type: "string", description: "Plain text version" },
            },
            required: ["subject", "htmlBody", "textBody"],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices[0]?.message?.content;
    if (typeof content === "string") {
      const parsed = JSON.parse(content);
      return {
        subject: parsed.subject || `${sportEmoji} Welcome to ATHLYNX VIP - Your Access Code Inside!`,
        htmlBody: parsed.htmlBody || generateFallbackVIPEmail(data, sportEmoji),
        textBody: parsed.textBody || generateFallbackVIPEmailText(data, sportEmoji),
      };
    }
  } catch (error) {
    console.error("[Email] AI generation failed, using fallback:", error);
  }

  // Fallback template
  return {
    subject: `${sportEmoji} Welcome to ATHLYNX VIP - Your Access Code: ${data.accessCode}`,
    htmlBody: generateFallbackVIPEmail(data, sportEmoji),
    textBody: generateFallbackVIPEmailText(data, sportEmoji),
  };
}

/**
 * Fallback HTML email template
 */
function generateFallbackVIPEmail(data: VIPSignupEmailData, sportEmoji: string): string {
  const userName = data.name || "Athlete";
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ATHLYNX VIP</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 600px; margin: 0 auto; padding: 0; background: #f8fafc;">
  
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px 30px; text-align: center;">
    <div style="font-size: 48px; margin-bottom: 10px;">🦀</div>
    <h1 style="color: #fbbf24; margin: 0; font-size: 28px; font-weight: bold;">ATHLYNX</h1>
    <p style="color: #94a3b8; margin: 5px 0 0 0; font-size: 14px;">DHG Crab Shield</p>
  </div>
  
  <!-- Main Content -->
  <div style="background: white; padding: 40px 30px;">
    <h2 style="color: #1a1a2e; margin: 0 0 20px 0; font-size: 24px;">
      ${sportEmoji} Welcome to VIP, ${userName}!
    </h2>
    
    <p style="color: #475569; font-size: 16px; margin-bottom: 25px;">
      Congratulations! You're now a <strong style="color: #fbbf24;">Founding VIP Member</strong> of ATHLYNX. 
      You're among the first to access the future of athlete development and NIL opportunities.
    </p>
    
    <!-- Access Code Box -->
    <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 25px; text-align: center; margin: 30px 0;">
      <p style="color: #94a3b8; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Your VIP Access Code</p>
      <div style="background: #fbbf24; color: #1a1a2e; font-size: 28px; font-weight: bold; padding: 15px 25px; border-radius: 8px; display: inline-block; letter-spacing: 3px; font-family: monospace;">
        ${data.accessCode}
      </div>
      <p style="color: #64748b; margin: 15px 0 0 0; font-size: 12px;">Save this code - you'll need it for early access!</p>
    </div>
    
    <!-- Details -->
    <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 25px 0;">
      <p style="margin: 0; color: #475569; font-size: 14px;">
        <strong>Role:</strong> ${data.role}<br>
        <strong>Sport:</strong> ${data.sport} ${sportEmoji}<br>
        <strong>Launch Date:</strong> February 1, 2026
      </p>
    </div>
    
    <!-- Features -->
    <h3 style="color: #1a1a2e; margin: 30px 0 15px 0; font-size: 18px;">What's Coming:</h3>
    <ul style="list-style: none; padding: 0; margin: 0;">
      <li style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #475569;">
        ⚾ <strong>Diamond Grind</strong> - Elite baseball platform with AI coaching
      </li>
      <li style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #475569;">
        🔄 <strong>Transfer Portal</strong> - Navigate your pathway to better opportunities
      </li>
      <li style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #475569;">
        💰 <strong>NIL Marketplace</strong> - Connect with brands and maximize earnings
      </li>
      <li style="padding: 12px 0; color: #475569;">
        🤖 <strong>AI Training</strong> - Personalized training plans powered by AI
      </li>
    </ul>
    
    <!-- CTA -->
    <div style="text-align: center; margin: 35px 0 25px 0;">
      <a href="https://athlynx.ai" style="background: #fbbf24; color: #1a1a2e; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">
        Explore the Platform →
      </a>
    </div>
  </div>
  
  <!-- Footer -->
  <div style="background: #1a1a2e; padding: 30px; text-align: center;">
    <p style="color: #94a3b8; margin: 0 0 10px 0; font-size: 14px;">
      <strong style="color: #fbbf24;">ATHLYNX</strong> by Dozier Holdings Group
    </p>
    <p style="color: #64748b; margin: 0; font-size: 12px;">
      Questions? Reply to this email or contact cdozier@dozierholdingsgroup.com
    </p>
  </div>
  
</body>
</html>`.trim();
}

/**
 * Fallback plain text email
 */
function generateFallbackVIPEmailText(data: VIPSignupEmailData, sportEmoji: string): string {
  const userName = data.name || "Athlete";
  
  return `
ATHLYNX - DHG Crab Shield
========================

${sportEmoji} Welcome to VIP, ${userName}!

Congratulations! You're now a Founding VIP Member of ATHLYNX.

YOUR VIP ACCESS CODE: ${data.accessCode}
(Save this code - you'll need it for early access!)

Details:
- Role: ${data.role}
- Sport: ${data.sport}
- Launch Date: February 1, 2026

What's Coming:
- Diamond Grind - Elite baseball platform with AI coaching
- Transfer Portal - Navigate your pathway to better opportunities
- NIL Marketplace - Connect with brands and maximize earnings
- AI Training - Personalized training plans powered by AI

Visit: https://athlynx.ai

---
ATHLYNX by Dozier Holdings Group
Questions? Contact cdozier@dozierholdingsgroup.com
`.trim();
}

/**
 * Send VIP confirmation email
 * Uses the Manus notification system to notify owner, and logs email for delivery
 */
export async function sendVIPConfirmationEmail(data: VIPSignupEmailData): Promise<boolean> {
  try {
    // Generate the email content
    const emailTemplate = await generateVIPWelcomeEmail(data);
    
    // Log the email (in production, this would integrate with email service)
    console.log("[Email] VIP Confirmation Email Generated:");
    console.log("To:", data.email);
    console.log("Subject:", emailTemplate.subject);
    console.log("Access Code:", data.accessCode);
    
    // Notify owner about new signup
    await notifyOwner({
      title: `🏆 New VIP Signup: ${data.email}`,
      content: `
New VIP Member Registration:
- Email: ${data.email}
- Role: ${data.role}
- Sport: ${data.sport}
- Access Code: ${data.accessCode}
- Time: ${new Date().toISOString()}

Email confirmation has been prepared for delivery.
      `.trim(),
    });
    
    return true;
  } catch (error) {
    console.error("[Email] Failed to send VIP confirmation:", error);
    return false;
  }
}

/**
 * Generate 2FA verification code
 */
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Generate 2FA email template
 */
export async function generate2FAEmail(email: string, code: string): Promise<EmailTemplate> {
  return {
    subject: `🔐 ATHLYNX Security Code: ${code}`,
    htmlBody: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc;">
  
  <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="font-size: 48px;">🔐</div>
      <h1 style="color: #1a1a2e; margin: 10px 0 0 0;">Security Verification</h1>
    </div>
    
    <p style="color: #475569; text-align: center;">Your verification code is:</p>
    
    <div style="background: #1a1a2e; border-radius: 12px; padding: 25px; text-align: center; margin: 20px 0;">
      <div style="color: #fbbf24; font-size: 36px; font-weight: bold; letter-spacing: 8px; font-family: monospace;">
        ${code}
      </div>
    </div>
    
    <p style="color: #64748b; text-align: center; font-size: 14px;">
      This code expires in 10 minutes.<br>
      If you didn't request this, please ignore this email.
    </p>
    
    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
    
    <p style="color: #94a3b8; text-align: center; font-size: 12px;">
      ATHLYNX by Dozier Holdings Group<br>
      Protecting your account security
    </p>
  </div>
  
</body>
</html>`.trim(),
    textBody: `
ATHLYNX Security Verification

Your verification code is: ${code}

This code expires in 10 minutes.
If you didn't request this, please ignore this email.

---
ATHLYNX by Dozier Holdings Group
`.trim(),
  };
}
