import { 
  users, 
  type User, 
  type InsertUser, 
  leads, 
  type Lead, 
  type InsertLead,
  conversations,
  type Conversation,
  type InsertConversation,
  leadMilestones,
  type LeadMilestone,
  type InsertLeadMilestone,
  marketingSettings,
  type MarketingSettings,
  type InsertMarketingSettings,
  pageReviews,
  type PageReview,
  type InsertPageReview
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Lead operations
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  getLead(id: number): Promise<Lead | undefined>;
  
  // Conversation operations
  saveConversation(conversation: InsertConversation): Promise<Conversation>;
  getConversationsByVisitorId(visitorId: string): Promise<Conversation[]>;
  
  // Lead milestone operations
  createLeadMilestone(milestone: InsertLeadMilestone): Promise<LeadMilestone>;
  updateLeadMilestone(id: number, updates: Partial<InsertLeadMilestone>): Promise<LeadMilestone | undefined>;
  getLeadMilestones(leadId: number): Promise<LeadMilestone[]>;
  getLeadMilestone(id: number): Promise<LeadMilestone | undefined>;
  getLeadMilestoneByIds(leadId: number, milestoneId: string): Promise<LeadMilestone | undefined>;
  
  // Marketing settings operations
  getMarketingSettings(): Promise<MarketingSettings | undefined>;
  createMarketingSettings(settings: InsertMarketingSettings): Promise<MarketingSettings>;
  updateMarketingSettings(id: number, updates: Partial<InsertMarketingSettings>): Promise<MarketingSettings | undefined>;
  
  // Page review operations
  createPageReview(review: InsertPageReview): Promise<PageReview>;
  getPageReviews(): Promise<PageReview[]>;
  getPageReview(id: number): Promise<PageReview | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result.length ? result[0] : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result.length ? result[0] : undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }
  
  // Lead methods
  async createLead(insertLead: InsertLead): Promise<Lead> {
    // Drizzle ORM expects an array for the values method in insert queries
    const result = await db.insert(leads).values({
      name: insertLead.name,
      email: insertLead.email,
      company: insertLead.company,
      phone: insertLead.phone,
      message: insertLead.message || null,
      business_type: insertLead.business_type || null,
      company_size: insertLead.company_size || null,
      annual_revenue: insertLead.annual_revenue || null,
      client_value: insertLead.client_value || null,
      marketing_needs: insertLead.marketing_needs || null,
      timeline: insertLead.timeline || null,
      budget: insertLead.budget || null,
      source: insertLead.source || null
    }).returning();
    
    return result[0];
  }
  
  async getLeads(): Promise<Lead[]> {
    return await db.select().from(leads).orderBy(desc(leads.created_at));
  }
  
  async getLead(id: number): Promise<Lead | undefined> {
    const result = await db.select().from(leads).where(eq(leads.id, id));
    return result.length ? result[0] : undefined;
  }
  
  // Conversation methods
  async saveConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const result = await db.insert(conversations).values(insertConversation).returning();
    return result[0];
  }
  
  async getConversationsByVisitorId(visitorId: string): Promise<Conversation[]> {
    return await db
      .select()
      .from(conversations)
      .where(eq(conversations.visitor_id, visitorId))
      .orderBy(conversations.created_at);
  }
  
  // Lead milestone methods
  async createLeadMilestone(milestone: InsertLeadMilestone): Promise<LeadMilestone> {
    const [result] = await db
      .insert(leadMilestones)
      .values(milestone)
      .returning();
    return result;
  }
  
  async updateLeadMilestone(id: number, updates: Partial<InsertLeadMilestone>): Promise<LeadMilestone | undefined> {
    const [result] = await db
      .update(leadMilestones)
      .set(updates)
      .where(eq(leadMilestones.id, id))
      .returning();
    return result;
  }
  
  async getLeadMilestones(leadId: number): Promise<LeadMilestone[]> {
    return await db
      .select()
      .from(leadMilestones)
      .where(eq(leadMilestones.lead_id, leadId))
      .orderBy(leadMilestones.created_at);
  }
  
  async getLeadMilestone(id: number): Promise<LeadMilestone | undefined> {
    const [result] = await db
      .select()
      .from(leadMilestones)
      .where(eq(leadMilestones.id, id));
    return result;
  }
  
  async getLeadMilestoneByIds(leadId: number, milestoneId: string): Promise<LeadMilestone | undefined> {
    const [result] = await db
      .select()
      .from(leadMilestones)
      .where(
        and(
          eq(leadMilestones.lead_id, leadId),
          eq(leadMilestones.milestone_id, milestoneId)
        )
      );
    return result;
  }

  // Marketing settings methods
  async getMarketingSettings(): Promise<MarketingSettings | undefined> {
    const results = await db
      .select()
      .from(marketingSettings)
      .limit(1);
    return results.length ? results[0] : undefined;
  }

  async createMarketingSettings(settings: InsertMarketingSettings): Promise<MarketingSettings> {
    const [result] = await db
      .insert(marketingSettings)
      .values(settings)
      .returning();
    return result;
  }

  async updateMarketingSettings(id: number, updates: Partial<InsertMarketingSettings>): Promise<MarketingSettings | undefined> {
    const [result] = await db
      .update(marketingSettings)
      .set({
        ...updates,
        updated_at: new Date()
      })
      .where(eq(marketingSettings.id, id))
      .returning();
    return result;
  }

  // Page review methods
  async createPageReview(review: InsertPageReview): Promise<PageReview> {
    const [result] = await db
      .insert(pageReviews)
      .values({
        website_url: review.website_url,
        name: review.name,
        email: review.email,
        phone: review.phone || null,
        page_goal: review.page_goal,
        target_audience: review.target_audience,
        offer_description: review.offer_description,
        why_right_choice: review.why_right_choice,
        common_objections: review.common_objections || null,
        monthly_traffic: review.monthly_traffic,
        source: review.source || "linkedin_outreach"
      })
      .returning();
    return result;
  }

  async getPageReviews(): Promise<PageReview[]> {
    return await db.select().from(pageReviews).orderBy(desc(pageReviews.created_at));
  }

  async getPageReview(id: number): Promise<PageReview | undefined> {
    const [result] = await db.select().from(pageReviews).where(eq(pageReviews.id, id));
    return result;
  }
}

// Switch from in-memory storage to database storage
export const storage = new DatabaseStorage();
