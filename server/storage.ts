import { users, type User, type InsertUser, leads, type Lead, type InsertLead, chatMessages, type ChatMessage, type InsertChatMessage } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Lead management
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  getLeadById(id: number): Promise<Lead | undefined>;
  
  // Chatbot conversation management
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatSessionMessages(sessionId: string): Promise<ChatMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private leads: Map<number, Lead>;
  private chatMessages: Map<number, ChatMessage>;
  currentUserId: number;
  currentLeadId: number;
  currentChatMessageId: number;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
    this.chatMessages = new Map();
    this.currentUserId = 1;
    this.currentLeadId = 1;
    this.currentChatMessageId = 1;
  }

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

  // Lead management methods
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = this.currentLeadId++;
    const now = new Date();
    const lead: Lead = { 
      ...insertLead, 
      id, 
      createdAt: now 
    };
    this.leads.set(id, lead);
    return lead;
  }

  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values());
  }

  async getLeadById(id: number): Promise<Lead | undefined> {
    return this.leads.get(id);
  }

  // Chatbot conversation management methods
  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentChatMessageId++;
    const now = new Date();
    const message: ChatMessage = {
      ...insertMessage,
      id,
      timestamp: now
    };
    this.chatMessages.set(id, message);
    return message;
  }

  async getChatSessionMessages(sessionId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(message => message.sessionId === sessionId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }
}

export const storage = new MemStorage();
