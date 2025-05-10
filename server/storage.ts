import { 
  users, 
  type User, 
  type InsertUser, 
  leads, 
  type Lead, 
  type InsertLead,
  conversations,
  type Conversation,
  type InsertConversation
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

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
}

// Switch from in-memory storage to database storage
export const storage = new DatabaseStorage();
