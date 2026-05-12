import { pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const quizLeadsTable = pgTable("quiz_leads", {
  id: serial("id").primaryKey(),
  email: text("email"),
  answers: jsonb("answers").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertQuizLeadSchema = createInsertSchema(quizLeadsTable).omit({ id: true, createdAt: true });
export type InsertQuizLead = z.infer<typeof insertQuizLeadSchema>;
export type QuizLead = typeof quizLeadsTable.$inferSelect;

export const waitlistTable = pgTable("waitlist_emails", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  productId: text("product_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertWaitlistSchema = createInsertSchema(waitlistTable).omit({ id: true, createdAt: true });
export type InsertWaitlist = z.infer<typeof insertWaitlistSchema>;
export type Waitlist = typeof waitlistTable.$inferSelect;
