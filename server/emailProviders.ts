/**
 * Email Provider Service with Dual Provider Support
 * Primary: Resend | Fallback: SendGrid
 * 
 * If one provider fails, automatically falls back to the other
 */

import { Resend } from 'resend';
import sgMail from '@sendgrid/mail';

// Initialize providers (will be configured when API keys are set)
let resend: Resend | null = null;
let sendgridConfigured = false;

// Initialize Resend if API key exists
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
  console.log('[Email] Resend provider initialized');
}

// Initialize SendGrid if API key exists
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  sendgridConfigured = true;
  console.log('[Email] SendGrid provider initialized');
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

export interface EmailResult {
  success: boolean;
  provider: 'resend' | 'sendgrid' | 'none';
  messageId?: string;
  error?: string;
}

/**
 * Send email using Resend
 */
async function sendWithResend(options: EmailOptions): Promise<EmailResult> {
  if (!resend) {
    return { success: false, provider: 'resend', error: 'Resend not configured' };
  }

  try {
    const fromEmail = options.from || 'ATHLYNX <noreply@athlynx.ai>';
    
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      replyTo: options.replyTo || 'cdozier14@athlynx.ai',
    });

    if (error) {
      console.error('[Email] Resend error:', error);
      return { success: false, provider: 'resend', error: error.message };
    }

    console.log('[Email] Sent via Resend:', data?.id);
    return { success: true, provider: 'resend', messageId: data?.id };
  } catch (err: any) {
    console.error('[Email] Resend exception:', err);
    return { success: false, provider: 'resend', error: err.message };
  }
}

/**
 * Send email using SendGrid
 */
async function sendWithSendGrid(options: EmailOptions): Promise<EmailResult> {
  if (!sendgridConfigured) {
    return { success: false, provider: 'sendgrid', error: 'SendGrid not configured' };
  }

  try {
    const fromEmail = options.from || 'noreply@athlynx.ai';
    
    const msg = {
      to: options.to,
      from: fromEmail,
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>/g, ''),
      replyTo: options.replyTo || 'cdozier14@athlynx.ai',
    };

    const response = await sgMail.send(msg);
    const messageId = response[0]?.headers?.['x-message-id'];
    
    console.log('[Email] Sent via SendGrid:', messageId);
    return { success: true, provider: 'sendgrid', messageId };
  } catch (err: any) {
    console.error('[Email] SendGrid exception:', err);
    return { success: false, provider: 'sendgrid', error: err.message };
  }
}

/**
 * Send email with automatic failover
 * Tries Resend first, falls back to SendGrid if it fails
 */
export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
  // Try Resend first (primary)
  if (resend) {
    const resendResult = await sendWithResend(options);
    if (resendResult.success) {
      return resendResult;
    }
    console.log('[Email] Resend failed, trying SendGrid fallback...');
  }

  // Try SendGrid (fallback)
  if (sendgridConfigured) {
    const sendgridResult = await sendWithSendGrid(options);
    if (sendgridResult.success) {
      return sendgridResult;
    }
  }

  // Both failed or not configured
  console.error('[Email] All providers failed or not configured');
  return {
    success: false,
    provider: 'none',
    error: 'No email providers available or all failed',
  };
}

/**
 * Check which email providers are configured
 */
export function getEmailProviderStatus(): { resend: boolean; sendgrid: boolean } {
  return {
    resend: resend !== null,
    sendgrid: sendgridConfigured,
  };
}

/**
 * Test email configuration
 */
export async function testEmailConfiguration(testEmail: string): Promise<EmailResult> {
  return sendEmail({
    to: testEmail,
    subject: '🧪 ATHLYNX Email Test',
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h1 style="color: #1a1a2e;">✅ Email Configuration Working!</h1>
        <p>This is a test email from ATHLYNX.</p>
        <p>Time: ${new Date().toISOString()}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">ATHLYNX by Dozier Holdings Group</p>
      </div>
    `,
    text: 'ATHLYNX Email Test - Configuration is working!',
  });
}
