import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { eq, desc, and, sql } from "drizzle-orm";
import {
  fcaDevotionals,
  fcaPodcasts,
  fcaBlogPosts,
  fcaPrayerRequests,
  fcaTestimonies,
  fcaComments,
  fcaDailyVerses,
} from "../drizzle/schema";

export const fcaRouter = router({
  // ==================== DEVOTIONALS ====================
  
  // Get today's devotional
  getTodayDevotional: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return null;
    
    const today = new Date().toISOString().split('T')[0];
    const devotional = await db
      .select()
      .from(fcaDevotionals)
      .where(sql`${fcaDevotionals.publishDate} = ${today}`)
      .limit(1);
    
    return devotional[0] || null;
  }),

  // Get all devotionals (paginated)
  getDevotionals: publicProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(10),
      category: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      
      const offset = (input.page - 1) * input.limit;
      
      const devotionals = await db
        .select()
        .from(fcaDevotionals)
        .orderBy(desc(fcaDevotionals.publishDate))
        .limit(input.limit)
        .offset(offset);
      
      return devotionals;
    }),

  // Get single devotional
  getDevotional: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;
      
      const devotional = await db
        .select()
        .from(fcaDevotionals)
        .where(eq(fcaDevotionals.id, input.id))
        .limit(1);
      
      // Increment views
      if (devotional[0]) {
        await db
          .update(fcaDevotionals)
          .set({ views: sql`${fcaDevotionals.views} + 1` })
          .where(eq(fcaDevotionals.id, input.id));
      }
      
      return devotional[0] || null;
    }),

  // Like devotional
  likeDevotional: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      await db
        .update(fcaDevotionals)
        .set({ likes: sql`${fcaDevotionals.likes} + 1` })
        .where(eq(fcaDevotionals.id, input.id));
      return { success: true };
    }),

  // ==================== PODCASTS ====================
  
  // Get all podcasts
  getPodcasts: publicProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(10),
      season: z.number().optional(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      
      const offset = (input.page - 1) * input.limit;
      
      const podcasts = await db
        .select()
        .from(fcaPodcasts)
        .orderBy(desc(fcaPodcasts.episodeNumber))
        .limit(input.limit)
        .offset(offset);
      
      return podcasts;
    }),

  // Get single podcast
  getPodcast: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;
      
      const podcast = await db
        .select()
        .from(fcaPodcasts)
        .where(eq(fcaPodcasts.id, input.id))
        .limit(1);
      
      return podcast[0] || null;
    }),

  // Record podcast play
  playPodcast: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      await db
        .update(fcaPodcasts)
        .set({ plays: sql`${fcaPodcasts.plays} + 1` })
        .where(eq(fcaPodcasts.id, input.id));
      return { success: true };
    }),

  // Get featured podcast
  getFeaturedPodcast: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return null;
    
    const podcast = await db
      .select()
      .from(fcaPodcasts)
      .where(eq(fcaPodcasts.featured, "yes"))
      .orderBy(desc(fcaPodcasts.publishDate))
      .limit(1);
    
    return podcast[0] || null;
  }),

  // ==================== BLOG POSTS ====================
  
  // Get all blog posts
  getBlogPosts: publicProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(10),
      category: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      
      const offset = (input.page - 1) * input.limit;
      
      const posts = await db
        .select()
        .from(fcaBlogPosts)
        .orderBy(desc(fcaBlogPosts.publishDate))
        .limit(input.limit)
        .offset(offset);
      
      return posts;
    }),

  // Get single blog post by slug
  getBlogPost: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;
      
      const post = await db
        .select()
        .from(fcaBlogPosts)
        .where(eq(fcaBlogPosts.slug, input.slug))
        .limit(1);
      
      // Increment views
      if (post[0]) {
        await db
          .update(fcaBlogPosts)
          .set({ views: sql`${fcaBlogPosts.views} + 1` })
          .where(eq(fcaBlogPosts.slug, input.slug));
      }
      
      return post[0] || null;
    }),

  // Get featured blog posts
  getFeaturedBlogPosts: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    
    const posts = await db
      .select()
      .from(fcaBlogPosts)
      .where(eq(fcaBlogPosts.featured, "yes"))
      .orderBy(desc(fcaBlogPosts.publishDate))
      .limit(3);
    
    return posts;
  }),

  // ==================== PRAYER REQUESTS ====================
  
  // Get prayer requests (prayer wall)
  getPrayerRequests: publicProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(20),
      status: z.enum(["active", "answered", "archived"]).optional(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      
      const offset = (input.page - 1) * input.limit;
      
      const prayers = await db
        .select()
        .from(fcaPrayerRequests)
        .where(eq(fcaPrayerRequests.approved, "yes"))
        .orderBy(desc(fcaPrayerRequests.createdAt))
        .limit(input.limit)
        .offset(offset);
      
      return prayers;
    }),

  // Submit prayer request
  submitPrayerRequest: protectedProcedure
    .input(z.object({
      title: z.string().min(1).max(255),
      request: z.string().min(1),
      category: z.string().optional(),
      isAnonymous: z.boolean().default(false),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      const result = await db.insert(fcaPrayerRequests).values({
        userId: ctx.user.id,
        userName: input.isAnonymous ? "Anonymous" : (ctx.user.name || "Athlete"),
        isAnonymous: input.isAnonymous ? "yes" : "no",
        title: input.title,
        request: input.request,
        category: input.category,
        status: "active",
        approved: "pending",
      });
      
      return { success: true, id: result[0].insertId };
    }),

  // Pray for someone (increment prayer count)
  prayForRequest: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      await db
        .update(fcaPrayerRequests)
        .set({ prayerCount: sql`${fcaPrayerRequests.prayerCount} + 1` })
        .where(eq(fcaPrayerRequests.id, input.id));
      return { success: true };
    }),

  // Mark prayer as answered
  markPrayerAnswered: protectedProcedure
    .input(z.object({
      id: z.number(),
      testimony: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      const prayer = await db
        .select()
        .from(fcaPrayerRequests)
        .where(eq(fcaPrayerRequests.id, input.id))
        .limit(1);
      
      if (prayer[0]?.userId !== ctx.user.id) {
        throw new Error("You can only mark your own prayers as answered");
      }
      
      await db
        .update(fcaPrayerRequests)
        .set({
          status: "answered",
          answeredDate: new Date(),
          testimony: input.testimony,
        })
        .where(eq(fcaPrayerRequests.id, input.id));
      
      return { success: true };
    }),

  // ==================== TESTIMONIES ====================
  
  // Get testimonies
  getTestimonies: publicProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(10),
      sport: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      
      const offset = (input.page - 1) * input.limit;
      
      const testimonies = await db
        .select()
        .from(fcaTestimonies)
        .where(eq(fcaTestimonies.approved, "yes"))
        .orderBy(desc(fcaTestimonies.publishDate))
        .limit(input.limit)
        .offset(offset);
      
      return testimonies;
    }),

  // Get featured testimonies
  getFeaturedTestimonies: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    
    const testimonies = await db
      .select()
      .from(fcaTestimonies)
      .where(and(
        eq(fcaTestimonies.approved, "yes"),
        eq(fcaTestimonies.featured, "yes")
      ))
      .orderBy(desc(fcaTestimonies.publishDate))
      .limit(3);
    
    return testimonies;
  }),

  // Submit testimony
  submitTestimony: protectedProcedure
    .input(z.object({
      title: z.string().min(1).max(255),
      testimony: z.string().min(1),
      sport: z.string(),
      school: z.string().optional(),
      scripture: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      const result = await db.insert(fcaTestimonies).values({
        userId: ctx.user.id,
        athleteName: ctx.user.name || "Athlete",
        title: input.title,
        testimony: input.testimony,
        sport: input.sport,
        school: input.school,
        scripture: input.scripture,
        publishDate: new Date(),
        approved: "pending",
      });
      
      return { success: true, id: result[0].insertId };
    }),

  // ==================== COMMENTS ====================
  
  // Get comments for content
  getComments: publicProcedure
    .input(z.object({
      contentType: z.enum(["devotional", "podcast", "blog", "prayer", "testimony"]),
      contentId: z.number(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      
      const comments = await db
        .select()
        .from(fcaComments)
        .where(and(
          eq(fcaComments.contentType, input.contentType),
          eq(fcaComments.contentId, input.contentId),
          eq(fcaComments.approved, "yes")
        ))
        .orderBy(desc(fcaComments.createdAt));
      
      return comments;
    }),

  // Add comment
  addComment: protectedProcedure
    .input(z.object({
      contentType: z.enum(["devotional", "podcast", "blog", "prayer", "testimony"]),
      contentId: z.number(),
      comment: z.string().min(1),
      parentCommentId: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      const result = await db.insert(fcaComments).values({
        userId: ctx.user.id,
        userName: ctx.user.name || "Athlete",
        contentType: input.contentType,
        contentId: input.contentId,
        comment: input.comment,
        parentCommentId: input.parentCommentId,
        approved: "pending",
      });
      
      return { success: true, id: result[0].insertId };
    }),

  // ==================== DAILY VERSE ====================
  
  // Get today's verse
  getTodayVerse: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return null;
    
    const today = new Date().toISOString().split('T')[0];
    const verse = await db
      .select()
      .from(fcaDailyVerses)
      .where(sql`${fcaDailyVerses.displayDate} = ${today}`)
      .limit(1);
    
    // If no verse for today, get the most recent one
    if (!verse[0]) {
      const recent = await db
        .select()
        .from(fcaDailyVerses)
        .orderBy(desc(fcaDailyVerses.displayDate))
        .limit(1);
      return recent[0] || null;
    }
    
    // Increment views
    await db
      .update(fcaDailyVerses)
      .set({ views: sql`${fcaDailyVerses.views} + 1` })
      .where(sql`${fcaDailyVerses.displayDate} = ${today}`);
    
    return verse[0];
  }),

  // ==================== STATS ====================
  
  // Get FCA community stats
  getStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return {
      devotionals: 0,
      prayerRequests: 0,
      answeredPrayers: 0,
      testimonies: 0,
      totalPrayers: 0,
    };
    
    // Get counts from each table
    const devotionalCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(fcaDevotionals);
    
    const prayerCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(fcaPrayerRequests)
      .where(eq(fcaPrayerRequests.approved, "yes"));
    
    const answeredPrayers = await db
      .select({ count: sql<number>`count(*)` })
      .from(fcaPrayerRequests)
      .where(eq(fcaPrayerRequests.status, "answered"));
    
    const testimonyCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(fcaTestimonies)
      .where(eq(fcaTestimonies.approved, "yes"));
    
    const totalPrayers = await db
      .select({ total: sql<number>`sum(prayerCount)` })
      .from(fcaPrayerRequests);
    
    return {
      devotionals: devotionalCount[0]?.count || 0,
      prayerRequests: prayerCount[0]?.count || 0,
      answeredPrayers: answeredPrayers[0]?.count || 0,
      testimonies: testimonyCount[0]?.count || 0,
      totalPrayers: totalPrayers[0]?.total || 0,
    };
  }),
});
