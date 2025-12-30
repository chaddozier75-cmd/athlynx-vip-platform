import { router, publicProcedure, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { posts, postLikes, postComments, follows, users, userStatsSummary, activityFeed } from "../drizzle/schema";
import { eq, desc, and, sql, inArray } from "drizzle-orm";

export const socialRouter = router({
  // Get feed - posts from people you follow + your own posts
  getFeed: protectedProcedure
    .input(z.object({
      limit: z.number().min(1).max(50).default(20),
      offset: z.number().min(0).default(0),
    }).optional())
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      const limit = input?.limit ?? 20;
      const offset = input?.offset ?? 0;
      
      // Get users the current user follows
      const following = await db.select({ followingId: follows.followingId })
        .from(follows)
        .where(eq(follows.followerId, ctx.user.id));
      
      const followingIds = following.map(f => f.followingId);
      followingIds.push(ctx.user.id); // Include own posts
      
      // Get posts from followed users
      const feedPosts = await db.select({
        id: posts.id,
        content: posts.content,
        mediaUrls: posts.mediaUrls,
        mediaType: posts.mediaType,
        postType: posts.postType,
        sourceApp: posts.sourceApp,
        likesCount: posts.likesCount,
        commentsCount: posts.commentsCount,
        sharesCount: posts.sharesCount,
        createdAt: posts.createdAt,
        userId: posts.userId,
        userName: users.name,
        userEmail: users.email,
      })
        .from(posts)
        .leftJoin(users, eq(posts.userId, users.id))
        .where(followingIds.length > 0 ? inArray(posts.userId, followingIds) : eq(posts.userId, ctx.user.id))
        .orderBy(desc(posts.createdAt))
        .limit(limit)
        .offset(offset);
      
      // Check which posts the user has liked
      const postIds = feedPosts.map(p => p.id);
      const userLikes = postIds.length > 0 ? await db.select({ postId: postLikes.postId })
        .from(postLikes)
        .where(and(
          inArray(postLikes.postId, postIds),
          eq(postLikes.userId, ctx.user.id)
        )) : [];
      
      const likedPostIds = new Set(userLikes.map(l => l.postId));
      
      return feedPosts.map(post => ({
        ...post,
        isLiked: likedPostIds.has(post.id),
      }));
    }),

  // Get public feed (for non-logged in users)
  getPublicFeed: publicProcedure
    .input(z.object({
      limit: z.number().min(1).max(50).default(20),
      offset: z.number().min(0).default(0),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      const limit = input?.limit ?? 20;
      const offset = input?.offset ?? 0;
      
      const feedPosts = await db.select({
        id: posts.id,
        content: posts.content,
        mediaUrls: posts.mediaUrls,
        mediaType: posts.mediaType,
        postType: posts.postType,
        sourceApp: posts.sourceApp,
        likesCount: posts.likesCount,
        commentsCount: posts.commentsCount,
        sharesCount: posts.sharesCount,
        createdAt: posts.createdAt,
        userId: posts.userId,
        userName: users.name,
      })
        .from(posts)
        .leftJoin(users, eq(posts.userId, users.id))
        .where(eq(posts.visibility, "public"))
        .orderBy(desc(posts.createdAt))
        .limit(limit)
        .offset(offset);
      
      return feedPosts;
    }),

  // Create a new post
  createPost: protectedProcedure
    .input(z.object({
      content: z.string().min(1).max(5000),
      mediaUrls: z.array(z.string()).optional(),
      mediaType: z.enum(["none", "image", "video", "gallery"]).default("none"),
      postType: z.enum(["status", "achievement", "workout", "nil_deal", "announcement", "milestone"]).default("status"),
      sourceApp: z.enum(["nil_portal", "diamond_grind", "messenger", "transfer_portal", "faith", "warriors_playbook"]).default("nil_portal"),
      visibility: z.enum(["public", "followers", "private"]).default("public"),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      const [newPost] = await db.insert(posts).values({
        userId: ctx.user.id,
        content: input.content,
        mediaUrls: input.mediaUrls || null,
        mediaType: input.mediaType,
        postType: input.postType,
        sourceApp: input.sourceApp,
        visibility: input.visibility,
      }).$returningId();
      
      // Update user stats
      await db.update(userStatsSummary)
        .set({ postsCount: sql`${userStatsSummary.postsCount} + 1` })
        .where(eq(userStatsSummary.userId, ctx.user.id));
      
      return { success: true, postId: newPost.id };
    }),

  // Like a post
  likePost: protectedProcedure
    .input(z.object({ postId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      // Check if already liked
      const existing = await db.select()
        .from(postLikes)
        .where(and(
          eq(postLikes.postId, input.postId),
          eq(postLikes.userId, ctx.user.id)
        ));
      
      if (existing.length > 0) {
        return { success: false, message: "Already liked" };
      }
      
      await db.insert(postLikes).values({
        postId: input.postId,
        userId: ctx.user.id,
      });
      
      // Increment like count
      await db.update(posts)
        .set({ likesCount: sql`${posts.likesCount} + 1` })
        .where(eq(posts.id, input.postId));
      
      return { success: true };
    }),

  // Unlike a post
  unlikePost: protectedProcedure
    .input(z.object({ postId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      await db.delete(postLikes)
        .where(and(
          eq(postLikes.postId, input.postId),
          eq(postLikes.userId, ctx.user.id)
        ));
      
      // Decrement like count
      await db.update(posts)
        .set({ likesCount: sql`${posts.likesCount} - 1` })
        .where(eq(posts.id, input.postId));
      
      return { success: true };
    }),

  // Add a comment
  addComment: protectedProcedure
    .input(z.object({
      postId: z.number(),
      content: z.string().min(1).max(2000),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      await db.insert(postComments).values({
        postId: input.postId,
        userId: ctx.user.id,
        content: input.content,
      });
      
      // Increment comment count
      await db.update(posts)
        .set({ commentsCount: sql`${posts.commentsCount} + 1` })
        .where(eq(posts.id, input.postId));
      
      return { success: true };
    }),

  // Get comments for a post
  getComments: publicProcedure
    .input(z.object({
      postId: z.number(),
      limit: z.number().min(1).max(100).default(50),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      const comments = await db.select({
        id: postComments.id,
        content: postComments.content,
        createdAt: postComments.createdAt,
        userId: postComments.userId,
        userName: users.name,
      })
        .from(postComments)
        .leftJoin(users, eq(postComments.userId, users.id))
        .where(eq(postComments.postId, input.postId))
        .orderBy(desc(postComments.createdAt))
        .limit(input.limit);
      
      return comments;
    }),

  // Follow a user
  followUser: protectedProcedure
    .input(z.object({ userId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      if (input.userId === ctx.user.id) {
        return { success: false, message: "Cannot follow yourself" };
      }
      
      // Check if already following
      const existing = await db.select()
        .from(follows)
        .where(and(
          eq(follows.followerId, ctx.user.id),
          eq(follows.followingId, input.userId)
        ));
      
      if (existing.length > 0) {
        return { success: false, message: "Already following" };
      }
      
      await db.insert(follows).values({
        followerId: ctx.user.id,
        followingId: input.userId,
      });
      
      // Update stats
      await db.update(userStatsSummary)
        .set({ followingCount: sql`${userStatsSummary.followingCount} + 1` })
        .where(eq(userStatsSummary.userId, ctx.user.id));
      
      await db.update(userStatsSummary)
        .set({ followersCount: sql`${userStatsSummary.followersCount} + 1` })
        .where(eq(userStatsSummary.userId, input.userId));
      
      return { success: true };
    }),

  // Unfollow a user
  unfollowUser: protectedProcedure
    .input(z.object({ userId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      await db.delete(follows)
        .where(and(
          eq(follows.followerId, ctx.user.id),
          eq(follows.followingId, input.userId)
        ));
      
      // Update stats
      await db.update(userStatsSummary)
        .set({ followingCount: sql`${userStatsSummary.followingCount} - 1` })
        .where(eq(userStatsSummary.userId, ctx.user.id));
      
      await db.update(userStatsSummary)
        .set({ followersCount: sql`${userStatsSummary.followersCount} - 1` })
        .where(eq(userStatsSummary.userId, input.userId));
      
      return { success: true };
    }),

  // Get user profile with stats
  getUserProfile: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      const [user] = await db.select({
        id: users.id,
        name: users.name,
        email: users.email,
        createdAt: users.createdAt,
      })
        .from(users)
        .where(eq(users.id, input.userId));
      
      if (!user) return null;
      
      const [stats] = await db.select()
        .from(userStatsSummary)
        .where(eq(userStatsSummary.userId, input.userId));
      
      const recentPosts = await db.select()
        .from(posts)
        .where(eq(posts.userId, input.userId))
        .orderBy(desc(posts.createdAt))
        .limit(10);
      
      return {
        ...user,
        stats: stats || {
          postsCount: 0,
          followersCount: 0,
          followingCount: 0,
          totalWorkouts: 0,
          achievementsCount: 0,
          level: 1,
        },
        recentPosts,
      };
    }),

  // Check if following a user
  isFollowing: protectedProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      const existing = await db.select()
        .from(follows)
        .where(and(
          eq(follows.followerId, ctx.user.id),
          eq(follows.followingId, input.userId)
        ));
      
      return existing.length > 0;
    }),

  // Get suggested users to follow
  getSuggestedUsers: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(20).default(5) }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      // Get users the current user is NOT following
      const following = await db.select({ followingId: follows.followingId })
        .from(follows)
        .where(eq(follows.followerId, ctx.user.id));
      
      const followingIds = following.map(f => f.followingId);
      followingIds.push(ctx.user.id); // Exclude self
      
      const suggested = await db.select({
        id: users.id,
        name: users.name,
        email: users.email,
      })
        .from(users)
        .where(followingIds.length > 0 ? sql`${users.id} NOT IN (${followingIds.join(',')})` : sql`${users.id} != ${ctx.user.id}`)
        .limit(input.limit);
      
      return suggested;
    }),

  // Get my stats
  getMyStats: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    
    let [stats] = await db.select()
      .from(userStatsSummary)
      .where(eq(userStatsSummary.userId, ctx.user.id));
    
    // Create stats if they don't exist (clean slate)
    if (!stats) {
      await db.insert(userStatsSummary).values({
        userId: ctx.user.id,
      });
      
      [stats] = await db.select()
        .from(userStatsSummary)
        .where(eq(userStatsSummary.userId, ctx.user.id));
    }
    
    return stats;
  }),
});
