import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertConversationSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Lead generation form submission
  app.post("/api/leads", async (req: Request, res: Response) => {
    try {
      const lead = insertLeadSchema.parse(req.body);
      const createdLead = await storage.createLead(lead);
      res.status(201).json({ success: true, data: createdLead });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          error: validationError.message 
        });
      } else {
        console.error("Error creating lead:", error);
        res.status(500).json({ 
          success: false, 
          error: "Failed to create lead" 
        });
      }
    }
  });

  // Get all leads (typically would have authentication)
  app.get("/api/leads", async (_req: Request, res: Response) => {
    try {
      const leads = await storage.getLeads();
      res.status(200).json({ success: true, data: leads });
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch leads" 
      });
    }
  });

  // Save chatbot conversation
  app.post("/api/conversations", async (req: Request, res: Response) => {
    try {
      const conversation = insertConversationSchema.parse(req.body);
      const savedConversation = await storage.saveConversation(conversation);
      res.status(201).json({ success: true, data: savedConversation });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          error: validationError.message 
        });
      } else {
        console.error("Error saving conversation:", error);
        res.status(500).json({ 
          success: false, 
          error: "Failed to save conversation" 
        });
      }
    }
  });

  // Get conversation history for a visitor
  app.get("/api/conversations/:visitorId", async (req: Request, res: Response) => {
    try {
      const { visitorId } = req.params;
      const conversations = await storage.getConversationsByVisitorId(visitorId);
      res.status(200).json({ success: true, data: conversations });
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch conversations" 
      });
    }
  });

  // Mock endpoint for Hume API synthesis (voice generation)
  // In a real implementation, this would call the Hume API
  app.post("/api/synthesize", async (req: Request, res: Response) => {
    try {
      const { text } = req.body;
      
      if (!text) {
        return res.status(400).json({ 
          success: false, 
          error: "Text is required" 
        });
      }
      
      // In a real implementation, we would call the Hume API here
      // For now, we'll return a success response
      res.status(200).json({ 
        success: true, 
        message: "Speech synthesis request successful"
      });
    } catch (error) {
      console.error("Error synthesizing speech:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to synthesize speech" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
