import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertChatMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Endpoint to submit a lead from the contact form
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      res.status(201).json({ success: true, lead });
    } catch (error) {
      res.status(400).json({ success: false, message: "Invalid lead data", error });
    }
  });

  // Endpoint to get all leads
  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.status(200).json(leads);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to retrieve leads", error });
    }
  });

  // Endpoint to add a chat message
  app.post("/api/chat/messages", async (req, res) => {
    try {
      const validatedData = insertChatMessageSchema.parse(req.body);
      const message = await storage.createChatMessage(validatedData);
      res.status(201).json({ success: true, message });
    } catch (error) {
      res.status(400).json({ success: false, message: "Invalid message data", error });
    }
  });

  // Endpoint to get chat session messages
  app.get("/api/chat/sessions/:sessionId/messages", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const messages = await storage.getChatSessionMessages(sessionId);
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to retrieve chat messages", error });
    }
  });

  // Endpoint to handle Hume API proxy for voice capabilities
  app.post("/api/hume/text-to-speech", async (req, res) => {
    try {
      // In a real implementation, this would make a request to the Hume API
      // with the provided text to get voice synthesis
      // For now, we'll just return a success response
      res.status(200).json({ success: true, message: "Speech synthesis request processed" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to process text-to-speech request", error });
    }
  });

  app.post("/api/hume/speech-to-text", async (req, res) => {
    try {
      // In a real implementation, this would make a request to the Hume API
      // with the provided audio data to get speech recognition
      // For now, we'll just return a success response
      res.status(200).json({ 
        success: true, 
        message: "Speech recognition request processed",
        text: "Sample transcribed text"
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to process speech-to-text request", error });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
