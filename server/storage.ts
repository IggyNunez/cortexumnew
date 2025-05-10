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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private leads: Map<number, Lead>;
  private conversations: Map<number, Conversation>;
  private currentUserId: number;
  private currentLeadId: number;
  private currentConversationId: number;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
    this.conversations = new Map();
    this.currentUserId = 1;
    this.currentLeadId = 1;
    this.currentConversationId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Lead methods
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = this.currentLeadId++;
    const created_at = new Date();
    const lead: Lead = { ...insertLead, id, created_at };
    this.leads.set(id, lead);
    return lead;
  }
  
  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values());
  }
  
  async getLead(id: number): Promise<Lead | undefined> {
    return this.leads.get(id);
  }
  
  // Conversation methods
  async saveConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const id = this.currentConversationId++;
    const created_at = new Date();
    const conversation: Conversation = { ...insertConversation, id, created_at };
    this.conversations.set(id, conversation);
    return conversation;
  }
  
  async getConversationsByVisitorId(visitorId: string): Promise<Conversation[]> {
    return Array.from(this.conversations.values())
      .filter(conversation => conversation.visitor_id === visitorId)
      .sort((a, b) => a.created_at.getTime() - b.created_at.getTime());
  }
}

export const storage = new MemStorage();
