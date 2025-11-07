import { pgTable, serial, varchar, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Visitors table - tracks all visitors and allows admin control
export const visitors = pgTable("visitors", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 255 }).notNull().unique(),
  ip: varchar("ip", { length: 255 }),
  country: varchar("country", { length: 255 }),
  language: varchar("language", { length: 255 }),
  device: varchar("device", { length: 255 }),
  browser: varchar("browser", { length: 255 }),
  os: varchar("os", { length: 255 }),
  currentPage: varchar("current_page", { length: 255 }),
  redirectTarget: varchar("redirect_target", { length: 255 }),
  status: varchar("status", { length: 50 }).default("active"),
  lastSeen: timestamp("last_seen").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Visitor = typeof visitors.$inferSelect;
export const insertVisitorSchema = createInsertSchema(visitors).omit({
  id: true,
  createdAt: true,
  lastSeen: true,
});
export type InsertVisitor = z.infer<typeof insertVisitorSchema>;
