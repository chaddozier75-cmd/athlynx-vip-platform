import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { transferPortalAthletes } from "../drizzle/schema";
import { eq, like, and, or, desc, asc, sql, gte, lte } from "drizzle-orm";

// Transfer Portal Search Input Schema
const searchInputSchema = z.object({
  sport: z.string().optional(),
  position: z.string().optional(),
  year: z.string().optional(),
  minRating: z.number().optional(),
  maxRating: z.number().optional(),
  state: z.string().optional(),
  previousSchool: z.string().optional(),
  previousDivision: z.string().optional(),
  portalStatus: z.enum(["entered", "committed", "withdrawn"]).optional(),
  search: z.string().optional(), // Name search
  sortBy: z.enum(["rating", "nilValue", "date", "name"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.number().default(1),
  limit: z.number().default(20),
});

// Sample transfer portal data for demo
const sampleAthletes = [
  {
    id: 1,
    name: "Marcus Johnson",
    sport: "Football",
    position: "Quarterback",
    year: "JR",
    heightInches: 75,
    weightPounds: 215,
    hometown: "Dallas",
    homeState: "TX",
    highSchool: "Skyline High School",
    previousSchool: "Texas Tech",
    previousConference: "Big 12",
    previousDivision: "D1",
    portalEntryDate: "2024-12-15",
    portalStatus: "entered" as const,
    on3Rating: 88.5,
    compositeRating: 87.2,
    stars: 4,
    nilValuation: 125000,
    twitterFollowers: 45000,
    instagramFollowers: 78000,
  },
  {
    id: 2,
    name: "DeShawn Williams",
    sport: "Football",
    position: "Wide Receiver",
    year: "SR",
    heightInches: 73,
    weightPounds: 195,
    hometown: "Atlanta",
    homeState: "GA",
    highSchool: "Westlake High School",
    previousSchool: "Georgia Tech",
    previousConference: "ACC",
    previousDivision: "D1",
    portalEntryDate: "2024-12-18",
    portalStatus: "entered" as const,
    on3Rating: 91.2,
    compositeRating: 90.5,
    stars: 4,
    nilValuation: 275000,
    twitterFollowers: 125000,
    instagramFollowers: 210000,
  },
  {
    id: 3,
    name: "Tyler Rodriguez",
    sport: "Baseball",
    position: "Pitcher",
    year: "SO",
    heightInches: 76,
    weightPounds: 205,
    hometown: "Miami",
    homeState: "FL",
    highSchool: "Columbus High School",
    previousSchool: "Florida State",
    previousConference: "ACC",
    previousDivision: "D1",
    portalEntryDate: "2024-12-10",
    portalStatus: "entered" as const,
    on3Rating: 85.3,
    compositeRating: 84.8,
    stars: 4,
    nilValuation: 95000,
    twitterFollowers: 22000,
    instagramFollowers: 35000,
  },
  {
    id: 4,
    name: "Jordan Smith",
    sport: "Basketball",
    position: "Point Guard",
    year: "JR",
    heightInches: 74,
    weightPounds: 185,
    hometown: "Chicago",
    homeState: "IL",
    highSchool: "Whitney Young",
    previousSchool: "Illinois",
    previousConference: "Big Ten",
    previousDivision: "D1",
    portalEntryDate: "2024-12-20",
    portalStatus: "entered" as const,
    on3Rating: 89.7,
    compositeRating: 88.9,
    stars: 4,
    nilValuation: 185000,
    twitterFollowers: 67000,
    instagramFollowers: 145000,
  },
  {
    id: 5,
    name: "Cameron Davis",
    sport: "Football",
    position: "Running Back",
    year: "SR",
    heightInches: 70,
    weightPounds: 210,
    hometown: "Los Angeles",
    homeState: "CA",
    highSchool: "Mater Dei",
    previousSchool: "USC",
    previousConference: "Big Ten",
    previousDivision: "D1",
    portalEntryDate: "2024-12-22",
    portalStatus: "committed" as const,
    newSchool: "Oregon",
    on3Rating: 93.5,
    compositeRating: 92.8,
    stars: 5,
    nilValuation: 450000,
    twitterFollowers: 250000,
    instagramFollowers: 380000,
  },
];

export const transferPortalRouter = router({
  // Search transfer portal athletes
  search: publicProcedure
    .input(searchInputSchema)
    .query(async ({ input }) => {
      // For demo, filter sample data
      let results = [...sampleAthletes];
      
      if (input.sport) {
        results = results.filter(a => a.sport.toLowerCase() === input.sport?.toLowerCase());
      }
      if (input.position) {
        results = results.filter(a => a.position.toLowerCase().includes(input.position?.toLowerCase() || ""));
      }
      if (input.portalStatus) {
        results = results.filter(a => a.portalStatus === input.portalStatus);
      }
      if (input.search) {
        results = results.filter(a => a.name.toLowerCase().includes(input.search?.toLowerCase() || ""));
      }
      if (input.minRating) {
        results = results.filter(a => (a.compositeRating || 0) >= (input.minRating || 0));
      }
      if (input.state) {
        results = results.filter(a => a.homeState === input.state);
      }
      
      // Sort
      if (input.sortBy === "rating") {
        results.sort((a, b) => (b.compositeRating || 0) - (a.compositeRating || 0));
      } else if (input.sortBy === "nilValue") {
        results.sort((a, b) => (b.nilValuation || 0) - (a.nilValuation || 0));
      }
      
      if (input.sortOrder === "asc") {
        results.reverse();
      }
      
      // Pagination
      const total = results.length;
      const start = (input.page - 1) * input.limit;
      const paginatedResults = results.slice(start, start + input.limit);
      
      return {
        athletes: paginatedResults,
        total,
        page: input.page,
        totalPages: Math.ceil(total / input.limit),
      };
    }),

  // Get single athlete details
  getAthlete: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const athlete = sampleAthletes.find(a => a.id === input.id);
      if (!athlete) {
        throw new Error("Athlete not found");
      }
      return athlete;
    }),

  // Get portal statistics
  getStats: publicProcedure.query(async () => {
    return {
      totalInPortal: 2847,
      enteredToday: 45,
      committedThisWeek: 312,
      avgNilValue: 125000,
      topSports: [
        { sport: "Football", count: 1245 },
        { sport: "Basketball", count: 523 },
        { sport: "Baseball", count: 412 },
        { sport: "Soccer", count: 287 },
        { sport: "Volleyball", count: 198 },
      ],
      topConferences: [
        { conference: "SEC", count: 423 },
        { conference: "Big Ten", count: 398 },
        { conference: "ACC", count: 356 },
        { conference: "Big 12", count: 312 },
        { conference: "Pac-12", count: 287 },
      ],
      recentActivity: [
        { date: "2024-12-29", entered: 45, committed: 23 },
        { date: "2024-12-28", entered: 67, committed: 31 },
        { date: "2024-12-27", entered: 52, committed: 28 },
        { date: "2024-12-26", entered: 38, committed: 19 },
        { date: "2024-12-25", entered: 12, committed: 8 },
      ],
    };
  }),

  // Get trending athletes (high NIL value, recent entries)
  getTrending: publicProcedure.query(async () => {
    // Return top athletes by NIL value
    return sampleAthletes
      .sort((a, b) => (b.nilValuation || 0) - (a.nilValuation || 0))
      .slice(0, 5);
  }),

  // Get athletes by sport
  getBySport: publicProcedure
    .input(z.object({ sport: z.string() }))
    .query(async ({ input }) => {
      return sampleAthletes.filter(
        a => a.sport.toLowerCase() === input.sport.toLowerCase()
      );
    }),

  // School subscription tiers
  getSubscriptionTiers: publicProcedure.query(() => {
    return {
      free: {
        name: "Free",
        price: 0,
        features: [
          "Basic search",
          "10 athlete views/month",
          "Limited filters",
        ],
      },
      pro: {
        name: "Pro",
        price: 499,
        features: [
          "Advanced search",
          "100 athlete views/month",
          "All filters",
          "Export to CSV",
          "Email alerts",
        ],
      },
      elite: {
        name: "Elite",
        price: 2999,
        features: [
          "Unlimited search",
          "Unlimited athlete views",
          "Real-time alerts",
          "AI matching",
          "Priority support",
          "Custom reports",
        ],
      },
      enterprise: {
        name: "Enterprise",
        price: 25000,
        annual: true,
        features: [
          "Everything in Elite",
          "API access",
          "Custom integrations",
          "Dedicated account manager",
          "White-label options",
          "Data feeds",
        ],
      },
    };
  }),
});

export type TransferPortalRouter = typeof transferPortalRouter;
