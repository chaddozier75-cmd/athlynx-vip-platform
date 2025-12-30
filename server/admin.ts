import { z } from "zod";
import { router, protectedProcedure } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { getDb } from "./db";
import { sql } from "drizzle-orm";

// Admin-only procedure middleware
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Admin access required",
    });
  }
  return next({ ctx });
});

export const adminRouter = router({
  // Dashboard overview stats
  getStats: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const ordersResult = await db.execute(sql`SELECT COUNT(*) as count, COALESCE(SUM(total_amount), 0) as revenue FROM orders`);
    const inquiriesResult = await db.execute(sql`SELECT COUNT(*) as count FROM sales_inquiries`);
    const productsResult = await db.execute(sql`SELECT COUNT(*) as count FROM products`);
    const partnersResult = await db.execute(sql`SELECT COUNT(*) as count FROM partners`);
    const usersResult = await db.execute(sql`SELECT COUNT(*) as count FROM user`);
    
    const orders = ((ordersResult as any)[0] as any[])[0] || { count: 0, revenue: 0 };
    const inquiries = ((inquiriesResult as any)[0] as any[])[0] || { count: 0 };
    const products = ((productsResult as any)[0] as any[])[0] || { count: 0 };
    const partners = ((partnersResult as any)[0] as any[])[0] || { count: 0 };
    const users = ((usersResult as any)[0] as any[])[0] || { count: 0 };

    return {
      totalOrders: Number(orders.count) || 0,
      totalRevenue: Number(orders.revenue) || 0,
      totalInquiries: Number(inquiries.count) || 0,
      totalProducts: Number(products.count) || 0,
      totalPartners: Number(partners.count) || 0,
      totalUsers: Number(users.count) || 0,
    };
  }),

  // Sales Inquiries
  getInquiries: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`
      SELECT id, name, email, company, phone, product_name, message, status, created_at 
      FROM sales_inquiries 
      ORDER BY created_at DESC
    `);
    return (result as any)[0] as any[];
  }),

  updateInquiryStatus: adminProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(["pending", "contacted", "closed"]),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      await db.execute(sql`UPDATE sales_inquiries SET status = ${input.status} WHERE id = ${input.id}`);
      return { success: true };
    }),

  // Orders
  getOrders: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`
      SELECT o.id, o.user_id, o.status, o.total_amount, o.shipping_address, o.created_at,
             u.name as user_name, u.email as user_email
      FROM orders o
      LEFT JOIN user u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `);
    return (result as any)[0] as any[];
  }),

  getOrderItems: adminProcedure
    .input(z.object({ orderId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      const result = await db.execute(sql`
        SELECT oi.id, oi.product_id, oi.quantity, oi.price_at_purchase,
               p.name as product_name
        FROM order_items oi
        LEFT JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ${input.orderId}
      `);
      return (result as any)[0] as any[];
    }),

  updateOrderStatus: adminProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      await db.execute(sql`UPDATE orders SET status = ${input.status} WHERE id = ${input.id}`);
      return { success: true };
    }),

  // Products
  getProducts: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`
      SELECT id, name, description, price, category, image_url, in_stock, requires_quote, created_at
      FROM products
      ORDER BY category, name
    `);
    return (result as any)[0] as any[];
  }),

  updateProduct: adminProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().optional(),
      description: z.string().optional(),
      price: z.number().optional(),
      category: z.string().optional(),
      inStock: z.boolean().optional(),
      requiresQuote: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      const updates: string[] = [];
      if (input.name !== undefined) updates.push(`name = '${input.name}'`);
      if (input.description !== undefined) updates.push(`description = '${input.description}'`);
      if (input.price !== undefined) updates.push(`price = ${input.price}`);
      if (input.category !== undefined) updates.push(`category = '${input.category}'`);
      if (input.inStock !== undefined) updates.push(`in_stock = ${input.inStock ? 1 : 0}`);
      if (input.requiresQuote !== undefined) updates.push(`requires_quote = ${input.requiresQuote ? 1 : 0}`);
      
      if (updates.length > 0) {
        await db.execute(sql.raw(`UPDATE products SET ${updates.join(", ")} WHERE id = ${input.id}`));
      }
      return { success: true };
    }),

  deleteProduct: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      await db.execute(sql`DELETE FROM products WHERE id = ${input.id}`);
      return { success: true };
    }),

  // Partners
  getPartners: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`
      SELECT id, name, company, email, access_code, status, created_at
      FROM partners
      ORDER BY created_at DESC
    `);
    return (result as any)[0] as any[];
  }),

  createPartner: adminProcedure
    .input(z.object({
      name: z.string(),
      company: z.string(),
      email: z.string().email(),
      accessCode: z.string(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      await db.execute(sql`
        INSERT INTO partners (name, company, email, access_code, status, created_at)
        VALUES (${input.name}, ${input.company}, ${input.email}, ${input.accessCode}, 'active', NOW())
      `);
      return { success: true };
    }),

  updatePartnerStatus: adminProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(["active", "inactive"]),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      await db.execute(sql`UPDATE partners SET status = ${input.status} WHERE id = ${input.id}`);
      return { success: true };
    }),

  // Partner Documents
  getDocuments: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`
      SELECT pd.id, pd.partner_id, pd.title, pd.description, pd.file_url, pd.category, pd.created_at,
             p.company as partner_company
      FROM partner_documents pd
      LEFT JOIN partners p ON pd.partner_id = p.id
      ORDER BY pd.created_at DESC
    `);
    return (result as any)[0] as any[];
  }),

  createDocument: adminProcedure
    .input(z.object({
      partnerId: z.number(),
      title: z.string(),
      description: z.string(),
      fileUrl: z.string(),
      category: z.enum(["quotes", "proposals", "technical", "presentations", "contracts", "general"]),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      await db.execute(sql`
        INSERT INTO partner_documents (partner_id, title, description, file_url, category, created_at)
        VALUES (${input.partnerId}, ${input.title}, ${input.description}, ${input.fileUrl}, ${input.category}, NOW())
      `);
      return { success: true };
    }),

  deleteDocument: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      await db.execute(sql`DELETE FROM partner_documents WHERE id = ${input.id}`);
      return { success: true };
    }),

  // Access Logs
  getAccessLogs: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`
      SELECT pal.id, pal.partner_id, pal.action, pal.ip_address, pal.user_agent, pal.created_at,
             p.company as partner_company
      FROM partner_access_logs pal
      LEFT JOIN partners p ON pal.partner_id = p.id
      ORDER BY pal.created_at DESC
      LIMIT 100
    `);
    return (result as any)[0] as any[];
  }),

  // Users management
  getUsers: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`
      SELECT id, open_id, name, email, avatar, role, created_at
      FROM user
      ORDER BY created_at DESC
    `);
    return (result as any)[0] as any[];
  }),

  updateUserRole: adminProcedure
    .input(z.object({
      id: z.number(),
      role: z.enum(["user", "admin"]),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      await db.execute(sql`UPDATE user SET role = ${input.role} WHERE id = ${input.id}`);
      return { success: true };
    }),
});
