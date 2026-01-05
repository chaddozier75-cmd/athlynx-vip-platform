import Stripe from "stripe";
import { db } from "./db";
import { users, subscriptions, transactions } from "../drizzle/schema";
import { eq } from "drizzle-orm";

// Initialize Stripe with live keys
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "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", {
  apiVersion: "2024-12-18.acacia",
});

/**
 * ATHLYNX MONETIZATION SYSTEM
 * Based on NIL Monetization Report - $500M+ Annual Revenue Potential
 * 
 * 15 REVENUE STREAMS:
 * 1. Platform & Marketplace Revenue ($91.9M)
 * 2. Financial Services - Insurance ($6.75M)
 * 3. Trading Cards, NFTs & Collectibles
 * 4. Gaming & Esports
 * 5. E-Commerce & Merchandise
 * 6. Talent Management & Agency Services
 * 7. Collective Services
 * 8. Education & Training
 * 9. Data & Analytics
 * 10. Legal & Compliance
 * 11. High School NIL
 * 12. International Expansion
 * 13. Military Division
 * 14. Revenue Sharing
 * 15. Premium Features
 */

// REVENUE STREAM 1: PLATFORM & MARKETPLACE
export const PLATFORM_PRICING = {
  // Marketplace Transactions - 15% of deal value (vs 20-30% industry standard)
  MARKETPLACE_FEE_PERCENT: 15,
  
  // School Subscriptions - $100K/year (350 D1 schools = $35M)
  SCHOOL_SUBSCRIPTION_ANNUAL: 100000,
  SCHOOL_SUBSCRIPTION_MONTHLY: 8500,
  
  // Collective Subscriptions - $50K/year (200 collectives = $10M)
  COLLECTIVE_SUBSCRIPTION_ANNUAL: 50000,
  COLLECTIVE_SUBSCRIPTION_MONTHLY: 4200,
  
  // Brand Subscriptions - $25K/year (500 brands = $12.5M)
  BRAND_SUBSCRIPTION_ANNUAL: 25000,
  BRAND_SUBSCRIPTION_MONTHLY: 2100,
  
  // Premium Athlete Features - $99/month (10,000 athletes = $11.9M)
  ATHLETE_PREMIUM_MONTHLY: 99,
  ATHLETE_PREMIUM_ANNUAL: 990, // 2 months free
};

// REVENUE STREAM 2: FINANCIAL SERVICES - INSURANCE
export const INSURANCE_PRICING = {
  // NIL Contract Protection - 15-20% commission on premiums
  CONTRACT_PROTECTION_COMMISSION: 0.175, // 17.5% average
  
  // Critical Injury Protection
  CRITICAL_INJURY_BASE: 5000,
  
  // Transfer Protection
  TRANSFER_PROTECTION_BASE: 2500,
  
  // Liability Coverage
  LIABILITY_COVERAGE_BASE: 3000,
  
  // Reputation Insurance
  REPUTATION_INSURANCE_BASE: 10000,
};

// REVENUE STREAM 3: TRADING CARDS, NFTs & COLLECTIBLES
export const COLLECTIBLES_PRICING = {
  // Physical Trading Cards - Revenue share
  TRADING_CARD_REVENUE_SHARE: 0.30, // 30% of sales
  
  // Digital NFTs - Marketplace fee
  NFT_MARKETPLACE_FEE: 0.05, // 5% of transaction
  
  // Autographed Memorabilia
  MEMORABILIA_COMMISSION: 0.25, // 25% commission
};

// REVENUE STREAM 4: GAMING & ESPORTS
export const GAMING_PRICING = {
  // In-app purchases
  IN_APP_PURCHASE_FEE: 0.30, // 30% platform fee
  
  // Tournament entry fees
  TOURNAMENT_ENTRY_FEE: 0.15, // 15% of entry
  
  // Virtual goods
  VIRTUAL_GOODS_COMMISSION: 0.30,
};

// REVENUE STREAM 5: E-COMMERCE & MERCHANDISE
export const ECOMMERCE_PRICING = {
  // Athlete merchandise - Revenue share
  MERCHANDISE_REVENUE_SHARE: 0.20, // 20% of sales
  
  // White-label products
  WHITE_LABEL_COMMISSION: 0.35, // 35% margin
  
  // Dropshipping
  DROPSHIP_MARGIN: 0.25, // 25% markup
};

// REVENUE STREAM 6: TALENT MANAGEMENT & AGENCY SERVICES
export const AGENCY_PRICING = {
  // Full representation - Industry standard
  FULL_REPRESENTATION_FEE: 0.15, // 15% of deals
  
  // Deal facilitation only
  DEAL_FACILITATION_FEE: 0.10, // 10% of deals
  
  // Consulting services - Hourly
  CONSULTING_HOURLY: 250,
  
  // Brand partnership packages
  BRAND_PARTNERSHIP_FEE: 5000, // Per partnership facilitated
};

// REVENUE STREAM 7: COLLECTIVE SERVICES
export const COLLECTIVE_PRICING = {
  // Collective management platform
  MANAGEMENT_PLATFORM_MONTHLY: 4200,
  
  // Compliance tools
  COMPLIANCE_TOOLS_MONTHLY: 1000,
  
  // Fundraising platform - Commission
  FUNDRAISING_COMMISSION: 0.05, // 5% of funds raised
};

// REVENUE STREAM 8: EDUCATION & TRAINING
export const EDUCATION_PRICING = {
  // Online courses
  COURSE_PRICE_RANGE: { min: 49, max: 499 },
  
  // Certification programs
  CERTIFICATION_PRICE: 999,
  
  // Workshops and webinars
  WORKSHOP_PRICE: 199,
  
  // One-on-one coaching
  COACHING_HOURLY: 150,
};

// REVENUE STREAM 9: DATA & ANALYTICS
export const ANALYTICS_PRICING = {
  // Basic analytics - Included in subscriptions
  BASIC_ANALYTICS: 0,
  
  // Advanced analytics
  ADVANCED_ANALYTICS_MONTHLY: 500,
  
  // Custom reports
  CUSTOM_REPORT_PRICE: 2500,
  
  // API access
  API_ACCESS_MONTHLY: 1000,
};

// REVENUE STREAM 10: LEGAL & COMPLIANCE
export const LEGAL_PRICING = {
  // Contract review
  CONTRACT_REVIEW_PRICE: 500,
  
  // Legal consultation - Hourly
  LEGAL_CONSULTATION_HOURLY: 350,
  
  // Compliance monitoring
  COMPLIANCE_MONITORING_MONTHLY: 750,
  
  // Document templates
  DOCUMENT_TEMPLATE_PRICE: 99,
};

// REVENUE STREAM 11: HIGH SCHOOL NIL
export const HIGH_SCHOOL_PRICING = {
  // High school athlete premium
  HS_ATHLETE_PREMIUM_MONTHLY: 49,
  
  // High school team subscription
  HS_TEAM_SUBSCRIPTION_ANNUAL: 5000,
  
  // High school marketplace fee
  HS_MARKETPLACE_FEE_PERCENT: 12, // Lower than college
};

// REVENUE STREAM 12: INTERNATIONAL EXPANSION
export const INTERNATIONAL_PRICING = {
  // International athlete premium
  INTL_ATHLETE_PREMIUM_MONTHLY: 79, // Adjusted for purchasing power
  
  // International school subscription
  INTL_SCHOOL_SUBSCRIPTION_ANNUAL: 75000,
  
  // Currency conversion fee
  CURRENCY_CONVERSION_FEE: 0.02, // 2% on international transactions
};

// REVENUE STREAM 13: MILITARY DIVISION
export const MILITARY_PRICING = {
  // Military athlete premium - Discounted
  MILITARY_ATHLETE_PREMIUM_MONTHLY: 49, // 50% discount
  
  // Military academy subscription
  MILITARY_ACADEMY_SUBSCRIPTION_ANNUAL: 50000,
  
  // Veterans support program - Sponsored
  VETERANS_PROGRAM_SPONSORED: true,
};

// REVENUE STREAM 14: REVENUE SHARING (House v. NCAA Settlement)
export const REVENUE_SHARING_PRICING = {
  // Platform fee on revenue sharing payments
  REVENUE_SHARING_PLATFORM_FEE: 0.05, // 5% of $20.5M annual payments
  
  // Administration fee
  ADMINISTRATION_FEE_PERCENT: 0.02, // 2% for managing distributions
};

// REVENUE STREAM 15: PREMIUM FEATURES
export const PREMIUM_FEATURES_PRICING = {
  // AI Training Bot
  AI_TRAINING_BOT_MONTHLY: 29,
  
  // AI Recruiting Companion
  AI_RECRUITING_COMPANION_MONTHLY: 39,
  
  // Advanced Analytics Dashboard
  ADVANCED_DASHBOARD_MONTHLY: 49,
  
  // Priority Support
  PRIORITY_SUPPORT_MONTHLY: 19,
  
  // Verified Badge
  VERIFIED_BADGE_ANNUAL: 99,
};

/**
 * Create a Stripe customer for a user
 */
export async function createStripeCustomer(userId: number, email: string, name?: string) {
  const customer = await stripe.customers.create({
    email,
    name: name || undefined,
    metadata: {
      userId: userId.toString(),
    },
  });

  // Store customer ID in database
  await db.update(users)
    .set({ stripeCustomerId: customer.id })
    .where(eq(users.id, userId));

  return customer;
}

/**
 * Create a subscription for a user
 */
export async function createSubscription(
  userId: number,
  priceId: string,
  subscriptionType: string
) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) {
    throw new Error("User not found");
  }

  let customerId = user.stripeCustomerId;

  // Create customer if doesn't exist
  if (!customerId) {
    const customer = await createStripeCustomer(userId, user.email!, user.name || undefined);
    customerId = customer.id;
  }

  // Create subscription
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    metadata: {
      userId: userId.toString(),
      subscriptionType,
    },
  });

  // Store subscription in database
  await db.insert(subscriptions).values({
    userId,
    stripeSubscriptionId: subscription.id,
    status: subscription.status,
    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
  });

  return subscription;
}

/**
 * Process a marketplace transaction with 15% fee
 */
export async function processMarketplaceTransaction(
  athleteId: number,
  brandId: number,
  dealValue: number,
  dealDescription: string
) {
  const platformFee = dealValue * (PLATFORM_PRICING.MARKETPLACE_FEE_PERCENT / 100);
  const athletePayout = dealValue - platformFee;

  // Create payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(dealValue * 100), // Convert to cents
    currency: "usd",
    application_fee_amount: Math.round(platformFee * 100),
    metadata: {
      athleteId: athleteId.toString(),
      brandId: brandId.toString(),
      dealDescription,
    },
  });

  // Record transaction
  await db.insert(transactions).values({
    userId: athleteId,
    amount: dealValue,
    platformFee,
    netAmount: athletePayout,
    type: "marketplace_deal",
    status: "pending",
    stripePaymentIntentId: paymentIntent.id,
  });

  return {
    paymentIntent,
    platformFee,
    athletePayout,
  };
}

/**
 * Calculate total revenue potential
 */
export function calculateRevenuePotential() {
  return {
    platformRevenue: 91900000, // $91.9M
    insuranceRevenue: 6750000, // $6.75M
    collectiblesRevenue: 15000000, // $15M estimated
    gamingRevenue: 8000000, // $8M estimated
    ecommerceRevenue: 25000000, // $25M estimated
    agencyRevenue: 30000000, // $30M estimated
    collectiveRevenue: 10000000, // $10M estimated
    educationRevenue: 12000000, // $12M estimated
    analyticsRevenue: 8000000, // $8M estimated
    legalRevenue: 5000000, // $5M estimated
    highSchoolRevenue: 20000000, // $20M estimated
    internationalRevenue: 50000000, // $50M estimated
    militaryRevenue: 3000000, // $3M estimated
    revenueSharingRevenue: 15000000, // $15M estimated
    premiumFeaturesRevenue: 11900000, // $11.9M
    totalRevenue: 311550000, // $311.55M conservative estimate
    targetRevenue: 500000000, // $500M+ at scale
  };
}

export default {
  stripe,
  createStripeCustomer,
  createSubscription,
  processMarketplaceTransaction,
  calculateRevenuePotential,
  PLATFORM_PRICING,
  INSURANCE_PRICING,
  COLLECTIBLES_PRICING,
  GAMING_PRICING,
  ECOMMERCE_PRICING,
  AGENCY_PRICING,
  COLLECTIVE_PRICING,
  EDUCATION_PRICING,
  ANALYTICS_PRICING,
  LEGAL_PRICING,
  HIGH_SCHOOL_PRICING,
  INTERNATIONAL_PRICING,
  MILITARY_PRICING,
  REVENUE_SHARING_PRICING,
  PREMIUM_FEATURES_PRICING,
};
