/**
 * ATHLYNX Enterprise Security Module
 * 
 * Implements industry-standard security measures:
 * - Rate limiting (brute force protection)
 * - Security headers (HSTS, CSP, X-Frame-Options)
 * - 2FA (Two-Factor Authentication)
 * - Session management
 * - Audit logging
 * - Data encryption
 */

import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import CryptoJS from 'crypto-js';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

// ============================================
// RATE LIMITING - Prevent Brute Force Attacks
// ============================================

/**
 * General API rate limiter
 * 100 requests per 15 minutes per IP
 */
export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again after 15 minutes',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Strict rate limiter for authentication endpoints
 * 5 attempts per 15 minutes per IP
 */
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per windowMs
  message: {
    error: 'Too many login attempts, please try again after 15 minutes',
    code: 'AUTH_RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful logins
});

/**
 * Signup rate limiter
 * 3 signups per hour per IP
 */
export const signupRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 signups per hour
  message: {
    error: 'Too many signup attempts, please try again after an hour',
    code: 'SIGNUP_RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ============================================
// SECURITY HEADERS - Helmet Configuration
// ============================================

/**
 * Helmet security headers configuration
 * Protects against common web vulnerabilities
 */
export const securityHeaders = helmet({
  // Content Security Policy
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://js.stripe.com", "https://maps.googleapis.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: ["'self'", "https://api.stripe.com", "https://api.manus.im", "https://*.manus.computer", "wss:"],
      frameSrc: ["'self'", "https://js.stripe.com", "https://hooks.stripe.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  // Strict Transport Security (HSTS)
  strictTransportSecurity: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
  // X-Frame-Options - Prevent clickjacking
  frameguard: {
    action: 'deny',
  },
  // X-Content-Type-Options - Prevent MIME sniffing
  noSniff: true,
  // X-XSS-Protection
  xssFilter: true,
  // Referrer Policy
  referrerPolicy: {
    policy: 'strict-origin-when-cross-origin',
  },
  // Hide X-Powered-By header
  hidePoweredBy: true,
});

// ============================================
// TWO-FACTOR AUTHENTICATION (2FA)
// ============================================

/**
 * Generate a new 2FA secret for a user
 */
export function generate2FASecret(userEmail: string): { secret: string; otpauthUrl: string } {
  const secret = speakeasy.generateSecret({
    name: `ATHLYNX (${userEmail})`,
    issuer: 'ATHLYNX',
    length: 32,
  });

  return {
    secret: secret.base32,
    otpauthUrl: secret.otpauth_url || '',
  };
}

/**
 * Generate QR code for 2FA setup
 */
export async function generate2FAQRCode(otpauthUrl: string): Promise<string> {
  try {
    return await QRCode.toDataURL(otpauthUrl);
  } catch (error) {
    console.error('[Security] Failed to generate 2FA QR code:', error);
    throw new Error('Failed to generate 2FA QR code');
  }
}

/**
 * Verify a 2FA token
 */
export function verify2FAToken(secret: string, token: string): boolean {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 2, // Allow 2 time steps tolerance (60 seconds)
  });
}

/**
 * Generate backup codes for 2FA recovery
 */
export function generateBackupCodes(count: number = 10): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    codes.push(code);
  }
  return codes;
}

// ============================================
// DATA ENCRYPTION (AES-256)
// ============================================

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || process.env.JWT_SECRET || 'athlynx-secure-key-2025';

/**
 * Encrypt sensitive data using AES-256
 */
export function encryptData(data: string): string {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
}

/**
 * Decrypt data encrypted with AES-256
 */
export function decryptData(encryptedData: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

/**
 * Hash sensitive data (one-way, for passwords)
 */
export function hashData(data: string): string {
  return CryptoJS.SHA256(data).toString();
}

// ============================================
// SESSION MANAGEMENT
// ============================================

export interface SessionInfo {
  userId: string;
  deviceId: string;
  ipAddress: string;
  userAgent: string;
  createdAt: number;
  lastActivity: number;
  expiresAt: number;
}

// Session timeout: 24 hours of inactivity
const SESSION_TIMEOUT_MS = 24 * 60 * 60 * 1000;
// Maximum session age: 30 days
const MAX_SESSION_AGE_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Create a new session
 */
export function createSession(userId: string, req: Request): SessionInfo {
  const now = Date.now();
  return {
    userId,
    deviceId: generateDeviceId(req),
    ipAddress: getClientIP(req),
    userAgent: req.headers['user-agent'] || 'unknown',
    createdAt: now,
    lastActivity: now,
    expiresAt: now + MAX_SESSION_AGE_MS,
  };
}

/**
 * Check if session is valid
 */
export function isSessionValid(session: SessionInfo): boolean {
  const now = Date.now();
  
  // Check if session has expired
  if (now > session.expiresAt) {
    return false;
  }
  
  // Check if session has been inactive too long
  if (now - session.lastActivity > SESSION_TIMEOUT_MS) {
    return false;
  }
  
  return true;
}

/**
 * Generate a unique device ID from request
 */
function generateDeviceId(req: Request): string {
  const userAgent = req.headers['user-agent'] || '';
  const ip = getClientIP(req);
  return hashData(`${userAgent}-${ip}`).substring(0, 16);
}

/**
 * Get client IP address
 */
export function getClientIP(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}

// ============================================
// AUDIT LOGGING
// ============================================

export interface AuditLogEntry {
  timestamp: number;
  userId: string | null;
  action: string;
  resource: string;
  ipAddress: string;
  userAgent: string;
  details: Record<string, any>;
  success: boolean;
}

// In-memory audit log (in production, this would go to a database)
const auditLog: AuditLogEntry[] = [];

/**
 * Log an audit event
 */
export function logAuditEvent(
  req: Request,
  action: string,
  resource: string,
  details: Record<string, any> = {},
  success: boolean = true,
  userId: string | null = null
): void {
  const entry: AuditLogEntry = {
    timestamp: Date.now(),
    userId,
    action,
    resource,
    ipAddress: getClientIP(req),
    userAgent: req.headers['user-agent'] || 'unknown',
    details,
    success,
  };

  auditLog.push(entry);
  
  // Keep only last 10,000 entries in memory
  if (auditLog.length > 10000) {
    auditLog.shift();
  }

  // Log to console for monitoring
  console.log(`[AUDIT] ${success ? '✓' : '✗'} ${action} on ${resource} by ${userId || 'anonymous'} from ${entry.ipAddress}`);
}

/**
 * Get recent audit logs
 */
export function getAuditLogs(limit: number = 100): AuditLogEntry[] {
  return auditLog.slice(-limit).reverse();
}

/**
 * Get audit logs for a specific user
 */
export function getUserAuditLogs(userId: string, limit: number = 50): AuditLogEntry[] {
  return auditLog
    .filter(entry => entry.userId === userId)
    .slice(-limit)
    .reverse();
}

// ============================================
// SUSPICIOUS ACTIVITY DETECTION
// ============================================

interface LoginAttempt {
  timestamp: number;
  ipAddress: string;
  success: boolean;
}

const loginAttempts: Map<string, LoginAttempt[]> = new Map();

/**
 * Record a login attempt
 */
export function recordLoginAttempt(userId: string, ipAddress: string, success: boolean): void {
  const attempts = loginAttempts.get(userId) || [];
  attempts.push({
    timestamp: Date.now(),
    ipAddress,
    success,
  });

  // Keep only last 24 hours of attempts
  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
  const recentAttempts = attempts.filter(a => a.timestamp > oneDayAgo);
  loginAttempts.set(userId, recentAttempts);
}

/**
 * Check for suspicious login activity
 */
export function checkSuspiciousActivity(userId: string, currentIP: string): {
  suspicious: boolean;
  reason?: string;
} {
  const attempts = loginAttempts.get(userId) || [];
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  const recentAttempts = attempts.filter(a => a.timestamp > oneHourAgo);

  // Check for multiple failed attempts
  const failedAttempts = recentAttempts.filter(a => !a.success);
  if (failedAttempts.length >= 5) {
    return {
      suspicious: true,
      reason: 'Multiple failed login attempts detected',
    };
  }

  // Check for login from new IP after failed attempts
  const successfulAttempts = attempts.filter(a => a.success);
  const knownIPs = new Set(successfulAttempts.map(a => a.ipAddress));
  if (failedAttempts.length > 0 && !knownIPs.has(currentIP)) {
    return {
      suspicious: true,
      reason: 'Login attempt from new location after failed attempts',
    };
  }

  return { suspicious: false };
}

// ============================================
// MIDDLEWARE
// ============================================

/**
 * Security middleware that combines all protections
 */
export function securityMiddleware(req: Request, res: Response, next: NextFunction): void {
  // Add security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  next();
}

/**
 * Log all API requests
 */
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logLevel = res.statusCode >= 400 ? 'WARN' : 'INFO';
    console.log(`[${logLevel}] ${req.method} ${req.path} ${res.statusCode} ${duration}ms - ${getClientIP(req)}`);
  });
  
  next();
}
