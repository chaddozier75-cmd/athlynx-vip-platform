/**
 * ATHLYNX REVENUE GENERATION ALGORITHMS
 * Phase IIIIIIII (8): Monetization Engine
 */

export interface Athlete {
  id: string;
  name: string;
  sport: string;
  school: string;
  schoolTier: 'Power 5' | 'Group of 5' | 'FCS' | 'D2' | 'D3';
  position: string;
  year: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior';
  followers: number;
  engagementRate: number;
  performanceRating: number; // 1-10
  logins: number;
  appOpens: number;
}

export interface Brand {
  id: string;
  name: string;
  industry: string;
  budget: number;
  targetSports: string[];
  targetDemographics: string[];
  minFollowers: number;
  preferredSchoolTiers: string[];
}

export interface NILDeal {
  brand: Brand;
  compatibilityScore: number;
  estimatedValue: number;
  commission: number;
}

/**
 * Algorithm 1: User Value Score (UVS)
 * Calculates the monetary value of a user to the platform
 */
export function calculateUserValueScore(athlete: Athlete): number {
  // Engagement metrics (40% weight)
  const engagementScore = (athlete.logins * 2 + athlete.appOpens * 1.5) / 100;
  
  // Social influence (30% weight)
  const socialScore = (athlete.followers / 1000 + athlete.engagementRate * 10) / 50;
  
  // NIL potential (30% weight)
  const sportTierMultiplier = {
    'Football': 3,
    'Basketball': 2.8,
    'Baseball': 2.2,
    'Soccer': 2.0,
    'Track & Field': 1.8,
    'Volleyball': 1.7,
  }[athlete.sport] || 1.5;
  
  const schoolTierMultiplier = {
    'Power 5': 3,
    'Group of 5': 2,
    'FCS': 1.5,
    'D2': 1.2,
    'D3': 1.0,
  }[athlete.schoolTier];
  
  const nilPotential = (sportTierMultiplier * schoolTierMultiplier * athlete.performanceRating) / 30;
  
  // Weighted average
  const uvs = (engagementScore * 0.4 + socialScore * 0.3 + nilPotential * 0.3) * 100;
  
  return Math.min(Math.max(uvs, 0), 100); // Clamp between 0-100
}

/**
 * Algorithm 2: NIL Deal Matching Engine
 * Matches athletes with brands for optimal deal opportunities
 */
export function matchNILDeals(athlete: Athlete, brands: Brand[]): NILDeal[] {
  const matches: NILDeal[] = [];
  
  for (const brand of brands) {
    const compatibility = calculateBrandAthleteCompatibility(athlete, brand);
    const estimatedValue = estimateDealValue(athlete, brand);
    
    // Only include high-quality matches
    if (compatibility > 0.7 && estimatedValue > 500) {
      matches.push({
        brand,
        compatibilityScore: compatibility,
        estimatedValue,
        commission: estimatedValue * 0.15, // 15% platform commission
      });
    }
  }
  
  // Sort by estimated value (highest first)
  return matches.sort((a, b) => b.estimatedValue - a.estimatedValue);
}

/**
 * Calculate brand-athlete compatibility score (0-1)
 */
function calculateBrandAthleteCompatibility(athlete: Athlete, brand: Brand): number {
  let score = 0;
  
  // Sport match (30%)
  if (brand.targetSports.includes(athlete.sport)) {
    score += 0.3;
  }
  
  // Follower requirement (25%)
  if (athlete.followers >= brand.minFollowers) {
    const followerRatio = Math.min(athlete.followers / brand.minFollowers, 3);
    score += 0.25 * (followerRatio / 3);
  }
  
  // School tier match (20%)
  if (brand.preferredSchoolTiers.includes(athlete.schoolTier)) {
    score += 0.2;
  }
  
  // Engagement rate (15%)
  const engagementBonus = Math.min(athlete.engagementRate / 10, 1) * 0.15;
  score += engagementBonus;
  
  // Performance rating (10%)
  score += (athlete.performanceRating / 10) * 0.1;
  
  return Math.min(score, 1);
}

/**
 * Estimate NIL deal value based on athlete metrics and brand budget
 */
function estimateDealValue(athlete: Athlete, brand: Brand): number {
  const baseValue = brand.budget * 0.1; // 10% of brand's total budget
  
  // Follower multiplier
  const followerMultiplier = 1 + Math.log10(athlete.followers + 1) / 10;
  
  // Engagement multiplier
  const engagementMultiplier = 1 + (athlete.engagementRate / 100);
  
  // Sport tier multiplier
  const sportMultiplier = {
    'Football': 1.5,
    'Basketball': 1.4,
    'Baseball': 1.2,
    'Soccer': 1.1,
    'Track & Field': 1.0,
    'Volleyball': 0.9,
  }[athlete.sport] || 1.0;
  
  // School tier multiplier
  const schoolMultiplier = {
    'Power 5': 1.5,
    'Group of 5': 1.2,
    'FCS': 1.0,
    'D2': 0.8,
    'D3': 0.6,
  }[athlete.schoolTier];
  
  const estimatedValue = baseValue * followerMultiplier * engagementMultiplier * sportMultiplier * schoolMultiplier;
  
  return Math.round(estimatedValue);
}

/**
 * Algorithm 3: Dynamic Subscription Pricing
 * Calculates personalized subscription price based on user profile
 */
export function calculateSubscriptionPrice(athlete: Athlete): number {
  const basePrice = 29; // $29/month base
  
  // Sport premium
  let sportMultiplier = 1.0;
  if (['Football', 'Basketball'].includes(athlete.sport)) {
    sportMultiplier = 1.5;
  } else if (['Baseball', 'Soccer'].includes(athlete.sport)) {
    sportMultiplier = 1.3;
  }
  
  // School tier premium
  let schoolMultiplier = 1.0;
  if (athlete.schoolTier === 'Power 5') {
    schoolMultiplier = 1.3;
  } else if (athlete.schoolTier === 'Group of 5') {
    schoolMultiplier = 1.1;
  }
  
  // Social influence premium
  let influenceMultiplier = 1.0;
  if (athlete.followers > 50000) {
    influenceMultiplier = 1.5;
  } else if (athlete.followers > 10000) {
    influenceMultiplier = 1.2;
  }
  
  const finalPrice = basePrice * sportMultiplier * schoolMultiplier * influenceMultiplier;
  
  // Round to nearest $5
  return Math.round(finalPrice / 5) * 5;
}

/**
 * Algorithm 4: Revenue Projection Model
 * Projects platform revenue based on user growth
 */
export interface RevenueProjection {
  month: number;
  users: number;
  subscriptionRevenue: number;
  nilCommissions: number;
  adRevenue: number;
  totalRevenue: number;
  cumulativeRevenue: number;
}

export function projectRevenue(
  initialUsers: number,
  monthlyGrowthRate: number,
  months: number
): RevenueProjection[] {
  const projections: RevenueProjection[] = [];
  let cumulativeRevenue = 0;
  
  for (let month = 1; month <= months; month++) {
    // User growth (compound monthly growth)
    const users = Math.round(initialUsers * Math.pow(1 + monthlyGrowthRate, month - 1));
    
    // Subscription revenue (assuming 60% conversion after free trial)
    const payingUsers = month > 6 ? Math.round(users * 0.6) : 0;
    const avgSubscriptionPrice = 35; // Average after dynamic pricing
    const subscriptionRevenue = payingUsers * avgSubscriptionPrice;
    
    // NIL commissions (15% of deals, increasing with user base)
    const avgDealsPerUser = 0.3; // 30% of users get deals per month
    const avgDealValue = 2500;
    const nilCommissions = Math.round(users * avgDealsPerUser * avgDealValue * 0.15);
    
    // Ad revenue (CPM model)
    const avgPageViewsPerUser = 20;
    const cpm = 5; // $5 CPM
    const adRevenue = Math.round((users * avgPageViewsPerUser * cpm) / 1000);
    
    const totalRevenue = subscriptionRevenue + nilCommissions + adRevenue;
    cumulativeRevenue += totalRevenue;
    
    projections.push({
      month,
      users,
      subscriptionRevenue,
      nilCommissions,
      adRevenue,
      totalRevenue,
      cumulativeRevenue,
    });
  }
  
  return projections;
}

/**
 * Algorithm 5: Pay-Per-Click ROI Calculator
 * Calculates optimal PPC bid and budget allocation
 */
export interface PPCCampaign {
  name: string;
  keywords: string[];
  targetCPC: number;
  monthlyBudget: number;
  expectedClicks: number;
  expectedConversions: number;
  expectedRevenue: number;
  roi: number;
}

export function calculatePPCStrategy(
  totalBudget: number,
  campaigns: Omit<PPCCampaign, 'expectedClicks' | 'expectedConversions' | 'expectedRevenue' | 'roi'>[]
): PPCCampaign[] {
  return campaigns.map(campaign => {
    const expectedClicks = Math.floor(campaign.monthlyBudget / campaign.targetCPC);
    
    // Conversion rates by campaign type
    const conversionRate = campaign.name.includes('NIL') ? 0.08 :
                          campaign.name.includes('Transfer') ? 0.06 :
                          0.05;
    
    const expectedConversions = Math.floor(expectedClicks * conversionRate);
    
    // Average revenue per conversion
    const avgRevenuePerConversion = campaign.name.includes('NIL') ? 375 : // 15% of $2500
                                   campaign.name.includes('Transfer') ? 150 :
                                   100;
    
    const expectedRevenue = expectedConversions * avgRevenuePerConversion;
    const roi = ((expectedRevenue - campaign.monthlyBudget) / campaign.monthlyBudget) * 100;
    
    return {
      ...campaign,
      expectedClicks,
      expectedConversions,
      expectedRevenue,
      roi,
    };
  });
}

/**
 * Algorithm 6: Lifetime Value (LTV) Calculator
 * Calculates the lifetime value of a user
 */
export function calculateLifetimeValue(athlete: Athlete): number {
  const uvs = calculateUserValueScore(athlete);
  const subscriptionPrice = calculateSubscriptionPrice(athlete);
  
  // Average subscription duration (months)
  const avgDuration = athlete.year === 'Senior' ? 12 :
                     athlete.year === 'Junior' ? 24 :
                     athlete.year === 'Sophomore' ? 36 :
                     48;
  
  // Subscription LTV
  const subscriptionLTV = subscriptionPrice * avgDuration * 0.6; // 60% retention
  
  // NIL commission LTV
  const avgNILDealsPerYear = uvs > 70 ? 6 : uvs > 50 ? 4 : 2;
  const avgDealValue = uvs > 70 ? 5000 : uvs > 50 ? 2500 : 1000;
  const nilLTV = (avgNILDealsPerYear * avgDealValue * 0.15) * (avgDuration / 12);
  
  // Ad revenue LTV
  const adLTV = (uvs / 10) * avgDuration;
  
  return Math.round(subscriptionLTV + nilLTV + adLTV);
}

export default {
  calculateUserValueScore,
  matchNILDeals,
  calculateSubscriptionPrice,
  projectRevenue,
  calculatePPCStrategy,
  calculateLifetimeValue,
};
