import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Leads table for capturing form submissions
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  phone: text("phone").notNull(),
  message: text("message"),
  
  // Business qualification fields
  business_type: text("business_type"),
  company_size: text("company_size"),
  annual_revenue: text("annual_revenue"),
  client_value: text("client_value"),
  marketing_needs: text("marketing_needs"),
  timeline: text("timeline"),
  budget: text("budget"),
  source: text("source"),
  
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeadSchema = createInsertSchema(leads).pick({
  name: true,
  email: true,
  company: true,
  phone: true,
  message: true,
  business_type: true,
  company_size: true,
  annual_revenue: true,
  client_value: true,
  marketing_needs: true,
  timeline: true,
  budget: true,
  source: true,
});

// Chatbot conversation records
export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  visitor_id: text("visitor_id").notNull(),
  message_text: text("message_text").notNull(),
  is_bot: boolean("is_bot").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const insertConversationSchema = createInsertSchema(conversations).pick({
  visitor_id: true,
  message_text: true,
  is_bot: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

// Lead lifecycle milestones
export const leadMilestones = pgTable("lead_milestones", {
  id: serial("id").primaryKey(),
  lead_id: integer("lead_id").notNull(),
  milestone_id: text("milestone_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  completed: boolean("completed").notNull().default(false),
  completed_at: timestamp("completed_at"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeadMilestoneSchema = createInsertSchema(leadMilestones).pick({
  lead_id: true,
  milestone_id: true,
  title: true,
  description: true,
  completed: true,
  completed_at: true,
});

export type InsertConversation = z.infer<typeof insertConversationSchema>;
export type Conversation = typeof conversations.$inferSelect;

export type InsertLeadMilestone = z.infer<typeof insertLeadMilestoneSchema>;
export type LeadMilestone = typeof leadMilestones.$inferSelect;
