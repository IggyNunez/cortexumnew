import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
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

// Marketing integration settings
export const marketingSettings = pgTable("marketing_settings", {
  id: serial("id").primaryKey(),
  
  // Google Analytics settings
  ga_enabled: boolean("ga_enabled").default(false).notNull(),
  ga_measurement_id: text("ga_measurement_id"),
  ga_settings: jsonb("ga_settings").default({}),
  
  // Facebook CAPI settings
  fb_capi_enabled: boolean("fb_capi_enabled").default(false).notNull(),
  fb_pixel_id: text("fb_pixel_id"),
  fb_access_token: text("fb_access_token"),
  fb_settings: jsonb("fb_settings").default({}),
  
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const insertMarketingSettingsSchema = createInsertSchema(marketingSettings).pick({
  ga_enabled: true,
  ga_measurement_id: true,
  ga_settings: true,
  fb_capi_enabled: true,
  fb_pixel_id: true,
  fb_access_token: true,
  fb_settings: true,
});

export type InsertMarketingSettings = z.infer<typeof insertMarketingSettingsSchema>;
export type MarketingSettings = typeof marketingSettings.$inferSelect;

// Landing Page Review requests (LinkedIn outreach campaign)
export const pageReviews = pgTable("page_reviews", {
  id: serial("id").primaryKey(),
  website_url: text("website_url").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  page_goal: text("page_goal").notNull(),
  target_audience: text("target_audience").notNull(),
  offer_description: text("offer_description").notNull(),
  why_right_choice: text("why_right_choice").notNull(),
  common_objections: text("common_objections"),
  monthly_traffic: text("monthly_traffic").notNull(),
  source: text("source").default("linkedin_outreach"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const insertPageReviewSchema = createInsertSchema(pageReviews).pick({
  website_url: true,
  name: true,
  email: true,
  phone: true,
  page_goal: true,
  target_audience: true,
  offer_description: true,
  why_right_choice: true,
  common_objections: true,
  monthly_traffic: true,
  source: true,
});

export type InsertPageReview = z.infer<typeof insertPageReviewSchema>;
export type PageReview = typeof pageReviews.$inferSelect;
