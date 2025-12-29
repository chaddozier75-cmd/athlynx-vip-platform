import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json, decimal, date } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  aiCredits: int("aiCredits").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Sports table for athlete sport selection and email customization
 */
export const sports = mysqlTable("sports", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  emoji: varchar("emoji", { length: 10 }).notNull(),
  imageUrl: text("imageUrl"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Sport = typeof sports.$inferSelect;
export type InsertSport = typeof sports.$inferInsert;

/**
 * Early access signups table for VIP beta users
 */
export const earlyAccessSignups = mysqlTable("early_access_signups", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  sportId: int("sportId").references(() => sports.id),
  isVip: mysqlEnum("isVip", ["yes", "no"]).default("no").notNull(),
  accessGranted: mysqlEnum("accessGranted", ["yes", "no"]).default("no").notNull(),
  confirmationEmailSent: mysqlEnum("confirmationEmailSent", ["yes", "no"]).default("no").notNull(),
  signupDate: timestamp("signupDate").defaultNow().notNull(),
  accessGrantedDate: timestamp("accessGrantedDate"),
});

export type EarlyAccessSignup = typeof earlyAccessSignups.$inferSelect;
export type InsertEarlyAccessSignup = typeof earlyAccessSignups.$inferInsert;

/**
 * VIP Members table for early access signups (pre-auth)
 * Stores signup data before users create accounts
 */
export const vipMembers = mysqlTable("vip_members", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }),
  role: varchar("role", { length: 50 }).notNull(), // Athlete, Parent, Coach, Brand
  sport: varchar("sport", { length: 100 }).notNull(),
  accessCode: varchar("accessCode", { length: 12 }).notNull().unique(),
  status: mysqlEnum("status", ["pending", "approved", "active"]).default("pending").notNull(),
  signupDate: timestamp("signupDate").defaultNow().notNull(),
  approvedDate: timestamp("approvedDate"),
});

export type VipMember = typeof vipMembers.$inferSelect;
export type InsertVipMember = typeof vipMembers.$inferInsert;

/**
 * Credit transactions table - tracks all credit purchases and grants
 */
export const creditTransactions = mysqlTable("credit_transactions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  amount: int("amount").notNull(), // Positive for purchases, negative for usage
  type: mysqlEnum("type", ["purchase", "grant", "refund", "bonus"]).notNull(),
  description: text("description"),
  stripePaymentId: varchar("stripePaymentId", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CreditTransaction = typeof creditTransactions.$inferSelect;
export type InsertCreditTransaction = typeof creditTransactions.$inferInsert;

/**
 * Credit usage table - tracks AI feature usage and credit deductions
 */
export const creditUsage = mysqlTable("credit_usage", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  actionType: varchar("actionType", { length: 100 }).notNull(), // "training_plan", "video_analysis", etc.
  creditsUsed: int("creditsUsed").notNull(),
  result: text("result"), // Store AI response or result summary
  metadata: text("metadata"), // JSON string for additional data
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CreditUsage = typeof creditUsage.$inferSelect;
export type InsertCreditUsage = typeof creditUsage.$inferInsert;


/**
 * ============================================
 * COMPLIANCE & SECURITY INFRASTRUCTURE
 * ============================================
 */

/**
 * Audit logs - Track ALL system access and data modifications
 * Required for HIPAA, FERPA, and security compliance
 */
export const auditLogs = mysqlTable("audit_logs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id),
  action: varchar("action", { length: 100 }).notNull(), // e.g., "view_medical_record", "update_profile", "delete_data"
  resource: varchar("resource", { length: 100 }).notNull(), // e.g., "medical_records", "athlete_profile"
  resourceId: int("resourceId"), // ID of the resource being accessed
  ipAddress: varchar("ipAddress", { length: 45 }), // IPv4 or IPv6
  userAgent: text("userAgent"),
  details: json("details"), // Additional context
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export type AuditLog = typeof auditLogs.$inferSelect;
export type InsertAuditLog = typeof auditLogs.$inferInsert;

/**
 * Consent records - Track parental/guardian consent for minors
 * Required for COPPA, HIPAA, and legal compliance
 */
export const consentRecords = mysqlTable("consent_records", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  consentType: mysqlEnum("consentType", [
    "parental_consent",
    "medical_data",
    "mental_health",
    "injury_tracking",
    "data_sharing",
    "aoc_medical_referral",
    "marketing",
    "research"
  ]).notNull(),
  granted: mysqlEnum("granted", ["yes", "no"]).notNull(),
  grantedBy: varchar("grantedBy", { length: 255 }), // "self" or parent/guardian name
  grantedByEmail: varchar("grantedByEmail", { length: 320 }),
  grantedByRelation: varchar("grantedByRelation", { length: 50 }), // "self", "parent", "guardian"
  ipAddress: varchar("ipAddress", { length: 45 }),
  consentDocument: text("consentDocument"), // URL to signed consent form
  expiresAt: timestamp("expiresAt"), // Some consents expire
  revokedAt: timestamp("revokedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ConsentRecord = typeof consentRecords.$inferSelect;
export type InsertConsentRecord = typeof consentRecords.$inferInsert;

/**
 * Medical records - HIPAA-compliant medical data storage
 * Encrypted at rest, access logged, restricted access
 */
export const medicalRecords = mysqlTable("medical_records", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  recordType: mysqlEnum("recordType", [
    "injury",
    "mental_health",
    "physical_assessment",
    "treatment_plan",
    "medical_clearance",
    "orthopedic_evaluation"
  ]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  severity: mysqlEnum("severity", ["low", "medium", "high", "critical"]),
  status: mysqlEnum("status", ["active", "resolved", "ongoing", "cleared"]).default("active").notNull(),
  diagnosisDate: date("diagnosisDate"),
  resolvedDate: date("resolvedDate"),
  providerId: int("providerId"), // Reference to medical provider
  providerName: varchar("providerName", { length: 255 }),
  providerNotes: text("providerNotes"), // Encrypted
  attachments: json("attachments"), // URLs to encrypted files
  metadata: json("metadata"), // Additional structured data
  isConfidential: mysqlEnum("isConfidential", ["yes", "no"]).default("yes").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MedicalRecord = typeof medicalRecords.$inferSelect;
export type InsertMedicalRecord = typeof medicalRecords.$inferInsert;

/**
 * Access control - Who can access what data
 * Implements role-based access control (RBAC)
 */
export const accessControl = mysqlTable("access_control", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  resource: varchar("resource", { length: 100 }).notNull(), // e.g., "medical_records", "athlete_profiles"
  resourceId: int("resourceId"), // Specific resource ID (null = all)
  permission: mysqlEnum("permission", ["read", "write", "delete", "admin"]).notNull(),
  grantedBy: int("grantedBy").references(() => users.id),
  reason: text("reason"),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AccessControl = typeof accessControl.$inferSelect;
export type InsertAccessControl = typeof accessControl.$inferInsert;

/**
 * NCAA compliance tracking
 * Track recruiting contacts, NIL deals, transfer portal status
 */
export const ncaaCompliance = mysqlTable("ncaa_compliance", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  complianceType: mysqlEnum("complianceType", [
    "recruiting_contact",
    "nil_deal",
    "transfer_portal",
    "amateurism_status",
    "eligibility_check"
  ]).notNull(),
  status: mysqlEnum("status", ["compliant", "pending_review", "violation", "cleared"]).default("pending_review").notNull(),
  details: json("details"),
  reviewedBy: int("reviewedBy").references(() => users.id),
  reviewedAt: timestamp("reviewedAt"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type NcaaCompliance = typeof ncaaCompliance.$inferSelect;
export type InsertNcaaCompliance = typeof ncaaCompliance.$inferInsert;

/**
 * NIL contracts - Track all NIL deals for tax and compliance
 */
export const nilContracts = mysqlTable("nil_contracts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  brandName: varchar("brandName", { length: 255 }).notNull(),
  brandContact: varchar("brandContact", { length: 255 }),
  contractValue: decimal("contractValue", { precision: 10, scale: 2 }).notNull(),
  contractType: mysqlEnum("contractType", [
    "social_media",
    "appearance",
    "endorsement",
    "merchandise",
    "content_creation",
    "other"
  ]).notNull(),
  startDate: date("startDate").notNull(),
  endDate: date("endDate"),
  status: mysqlEnum("status", ["pending", "active", "completed", "terminated"]).default("pending").notNull(),
  contractDocument: text("contractDocument"), // URL to signed contract
  taxReported: mysqlEnum("taxReported", ["yes", "no"]).default("no").notNull(),
  taxYear: int("taxYear"),
  complianceApproved: mysqlEnum("complianceApproved", ["yes", "no", "pending"]).default("pending").notNull(),
  schoolApproved: mysqlEnum("schoolApproved", ["yes", "no", "pending", "not_required"]).default("pending").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type NilContract = typeof nilContracts.$inferSelect;
export type InsertNilContract = typeof nilContracts.$inferInsert;

/**
 * Security incidents - Track security events and breaches
 */
export const securityIncidents = mysqlTable("security_incidents", {
  id: int("id").autoincrement().primaryKey(),
  incidentType: mysqlEnum("incidentType", [
    "unauthorized_access",
    "data_breach",
    "phishing_attempt",
    "malware",
    "insider_threat",
    "policy_violation",
    "other"
  ]).notNull(),
  severity: mysqlEnum("severity", ["low", "medium", "high", "critical"]).notNull(),
  description: text("description").notNull(),
  affectedUsers: json("affectedUsers"), // Array of user IDs
  detectedBy: int("detectedBy").references(() => users.id),
  detectedAt: timestamp("detectedAt").defaultNow().notNull(),
  resolvedBy: int("resolvedBy").references(() => users.id),
  resolvedAt: timestamp("resolvedAt"),
  status: mysqlEnum("status", ["open", "investigating", "resolved", "false_alarm"]).default("open").notNull(),
  actionsTaken: text("actionsTaken"),
  notificationsSent: mysqlEnum("notificationsSent", ["yes", "no"]).default("no").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SecurityIncident = typeof securityIncidents.$inferSelect;
export type InsertSecurityIncident = typeof securityIncidents.$inferInsert;

/**
 * Employee access logs - Track internal employee access to sensitive data
 * Required for insider threat monitoring
 */
export const employeeAccessLogs = mysqlTable("employee_access_logs", {
  id: int("id").autoincrement().primaryKey(),
  employeeId: int("employeeId").notNull().references(() => users.id),
  action: varchar("action", { length: 100 }).notNull(),
  resource: varchar("resource", { length: 100 }).notNull(),
  resourceId: int("resourceId"),
  justification: text("justification"), // Why did they access this?
  approved: mysqlEnum("approved", ["yes", "no", "pending"]).default("pending").notNull(),
  approvedBy: int("approvedBy").references(() => users.id),
  flagged: mysqlEnum("flagged", ["yes", "no"]).default("no").notNull(),
  flagReason: text("flagReason"),
  ipAddress: varchar("ipAddress", { length: 45 }),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export type EmployeeAccessLog = typeof employeeAccessLogs.$inferSelect;
export type InsertEmployeeAccessLog = typeof employeeAccessLogs.$inferInsert;
