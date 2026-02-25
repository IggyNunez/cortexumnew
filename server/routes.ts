import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertLeadSchema, insertConversationSchema, insertLeadMilestoneSchema, insertPageReviewSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import Stripe from "stripe";
import { sendLeadNotification } from "./email";
import { addLeadToSheet } from "./googleSheets";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  try {
    setupAuth(app);
  } catch (authError) {
    console.error("[Routes] Auth setup failed:", authError);
    // Continue without auth - leads endpoint doesn't require it
  }
  
  // Initialize Stripe (lazy - only used for payment routes)
  let stripe: Stripe | null = null;
  function getStripe(): Stripe {
    if (!stripe) {
      if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error('STRIPE_SECRET_KEY is not configured');
      }
      stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-04-30.basil' as any,
      });
    }
    return stripe;
  }
  
  // Authentication middleware for protected routes
  const requireAuth = (req: Request, res: Response, next: Function) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        success: false,
        error: "Authentication required"
      });
    }
    next();
  };
  // Lead generation form submission
  app.post("/api/leads", async (req: Request, res: Response) => {
    try {
      const lead = insertLeadSchema.parse(req.body);
      const createdLead = await storage.createLead(lead);
      
      // Send email notification
      try {
        await sendLeadNotification(createdLead);
      } catch (emailError) {
        console.error("Error sending lead notification email:", emailError);
        // Don't return an error to the client if only the email fails
      }
      
      res.status(201).json({ success: true, data: createdLead });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          error: validationError.message 
        });
      } else {
        console.error("Error creating lead:", error instanceof Error ? error.message : error);
        console.error("Stack:", error instanceof Error ? error.stack : "N/A");
        res.status(500).json({
          success: false,
          error: error instanceof Error ? error.message : "Failed to create lead"
        });
      }
    }
  });

  // Get all leads (typically would have authentication)
  app.get("/api/leads", requireAuth, async (_req: Request, res: Response) => {
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
  
  // Export leads as CSV (positioned before the :id route to avoid conflicts)
  app.get("/api/leads/export", requireAuth, async (_req: Request, res: Response) => {
    try {
      const leads = await storage.getLeads();
      
      if (leads.length === 0) {
        return res.status(404).json({
          success: false,
          error: "No leads to export"
        });
      }
      
      // Create CSV header from the first lead's keys
      // Use all possible fields from our schema
      const csvHeader = [
        'id', 'name', 'email', 'company', 'phone', 'message',
        'business_type', 'company_size', 'annual_revenue', 'client_value',
        'marketing_needs', 'timeline', 'budget', 'source', 'created_at'
      ].join(',');
      
      // Create CSV rows
      const csvRows = leads.map(lead => {
        return [
          lead.id,
          `"${lead.name || ''}"`,
          `"${lead.email || ''}"`,
          `"${lead.company || ''}"`,
          `"${lead.phone || ''}"`,
          `"${lead.message || ''}"`,
          `"${lead.business_type || ''}"`,
          `"${lead.company_size || ''}"`,
          `"${lead.annual_revenue || ''}"`,
          `"${lead.client_value || ''}"`,
          `"${lead.marketing_needs || ''}"`,
          `"${lead.timeline || ''}"`,
          `"${lead.budget || ''}"`,
          `"${lead.source || ''}"`,
          lead.created_at ? new Date(lead.created_at).toISOString() : ''
        ].join(',');
      });
      
      // Combine header and rows
      const csv = [csvHeader, ...csvRows].join('\n');
      
      // Set headers for CSV download
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="leads-${new Date().toISOString().split('T')[0]}.csv"`);
      
      res.send(csv);
    } catch (error) {
      console.error("Error exporting leads:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to export leads" 
      });
    }
  });
  
  // Get a specific lead by ID
  app.get("/api/leads/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          error: "Invalid lead ID" 
        });
      }
      
      const lead = await storage.getLead(id);
      
      if (!lead) {
        return res.status(404).json({ 
          success: false, 
          error: "Lead not found" 
        });
      }
      
      res.status(200).json({ success: true, data: lead });
    } catch (error) {
      console.error("Error fetching lead:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch lead" 
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
  
  // Lead Lifecycle Milestones API
  
  // Get milestones for a lead
  app.get("/api/leads/:leadId/milestones", async (req: Request, res: Response) => {
    try {
      const leadId = parseInt(req.params.leadId);
      
      if (isNaN(leadId)) {
        return res.status(400).json({ 
          success: false, 
          error: "Invalid lead ID" 
        });
      }
      
      const milestones = await storage.getLeadMilestones(leadId);
      res.status(200).json({ success: true, data: milestones });
    } catch (error) {
      console.error("Error fetching lead milestones:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch lead milestones" 
      });
    }
  });
  
  // Create a milestone for a lead
  app.post("/api/leads/:leadId/milestones", async (req: Request, res: Response) => {
    try {
      const leadId = parseInt(req.params.leadId);
      
      if (isNaN(leadId)) {
        return res.status(400).json({ 
          success: false, 
          error: "Invalid lead ID" 
        });
      }
      
      // Validate the request body
      const milestoneData = insertLeadMilestoneSchema.parse({
        ...req.body,
        lead_id: leadId
      });
      
      const milestone = await storage.createLeadMilestone(milestoneData);
      res.status(201).json({ success: true, data: milestone });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          error: validationError.message 
        });
      } else {
        console.error("Error creating milestone:", error);
        res.status(500).json({ 
          success: false, 
          error: "Failed to create milestone" 
        });
      }
    }
  });
  
  // Update a milestone
  app.patch("/api/leads/milestones/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          error: "Invalid milestone ID" 
        });
      }
      
      const updates = req.body;
      
      // If we're marking as completed, add the timestamp
      if (updates.completed === true) {
        updates.completed_at = new Date();
      }
      
      const milestone = await storage.updateLeadMilestone(id, updates);
      
      if (!milestone) {
        return res.status(404).json({ 
          success: false, 
          error: "Milestone not found" 
        });
      }
      
      res.status(200).json({ success: true, data: milestone });
    } catch (error) {
      console.error("Error updating milestone:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to update milestone" 
      });
    }
  });

  // Landing Page Review submissions (LinkedIn outreach campaign)
  app.post("/api/page-reviews", async (req: Request, res: Response) => {
    try {
      const review = insertPageReviewSchema.parse(req.body);
      const createdReview = await storage.createPageReview(review);
      
      // Send email notification
      try {
        await sendLeadNotification({
          id: createdReview.id,
          name: createdReview.name,
          email: createdReview.email,
          company: createdReview.website_url,
          phone: createdReview.phone || "",
          message: `Landing Page Review Request\n\nWebsite: ${createdReview.website_url}\nGoal: ${createdReview.page_goal}\nTarget Audience: ${createdReview.target_audience}\nOffer: ${createdReview.offer_description}\nWhy Right Choice: ${createdReview.why_right_choice}\nObjections: ${createdReview.common_objections || "N/A"}\nMonthly Traffic: ${createdReview.monthly_traffic}`,
          business_type: "Landing Page Review",
          company_size: null,
          annual_revenue: null,
          client_value: null,
          marketing_needs: null,
          timeline: null,
          budget: null,
          source: createdReview.source,
          created_at: createdReview.created_at
        });
      } catch (emailError) {
        console.error("Error sending page review notification email:", emailError);
      }
      
      // Add lead to Google Sheets
      try {
        await addLeadToSheet({
          fullName: createdReview.name,
          email: createdReview.email,
          companyName: createdReview.website_url,
          websiteUrl: createdReview.website_url,
          monthlyAdSpend: createdReview.monthly_traffic,
          biggestChallenge: createdReview.page_goal,
          createdAt: createdReview.created_at
        });
      } catch (sheetError) {
        console.error("Error adding lead to Google Sheet:", sheetError);
      }
      
      res.status(201).json({ success: true, data: createdReview });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          error: validationError.message 
        });
      } else {
        console.error("Error creating page review:", error);
        res.status(500).json({ 
          success: false, 
          error: "Failed to create page review" 
        });
      }
    }
  });

  // Get all page reviews (protected)
  app.get("/api/page-reviews", requireAuth, async (_req: Request, res: Response) => {
    try {
      const reviews = await storage.getPageReviews();
      res.status(200).json({ success: true, data: reviews });
    } catch (error) {
      console.error("Error fetching page reviews:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch page reviews" 
      });
    }
  });

  // ElevenLabs and chatbot endpoints removed - feature deprecated

  // Marketing Settings API Endpoints
  // Get marketing settings
  app.get("/api/marketing-settings", requireAuth, async (_req: Request, res: Response) => {
    try {
      const settings = await storage.getMarketingSettings();
      
      if (!settings) {
        // If no settings exist, create default settings
        const defaultSettings = {
          ga_enabled: false,
          fb_capi_enabled: false,
          ga_settings: {},
          fb_settings: {}
        };
        
        const newSettings = await storage.createMarketingSettings(defaultSettings);
        
        return res.json({
          success: true,
          data: newSettings
        });
      }
      
      return res.json({
        success: true,
        data: settings
      });
    } catch (error) {
      console.error("Error retrieving marketing settings:", error);
      res.status(500).json({
        success: false,
        error: "Failed to retrieve marketing settings"
      });
    }
  });
  
  // Update marketing settings
  app.patch("/api/marketing-settings/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: "Invalid settings ID"
        });
      }
      
      const updates = req.body;
      const updatedSettings = await storage.updateMarketingSettings(id, updates);
      
      if (!updatedSettings) {
        return res.status(404).json({
          success: false,
          error: "Settings not found"
        });
      }
      
      return res.json({
        success: true,
        data: updatedSettings
      });
    } catch (error) {
      console.error("Error updating marketing settings:", error);
      res.status(500).json({
        success: false,
        error: "Failed to update marketing settings"
      });
    }
  });

  // Stripe payment routes
  app.post("/api/create-payment-intent", async (req: Request, res: Response) => {
    try {
      const { amount, currency = "usd", metadata = {} } = req.body;
      
      if (!amount || isNaN(parseFloat(amount))) {
        return res.status(400).json({ 
          success: false, 
          error: "Valid amount is required" 
        });
      }
      
      // Amount should be in cents for Stripe
      const amountInCents = Math.round(parseFloat(amount) * 100);
      
      const paymentIntent = await getStripe().paymentIntents.create({
        amount: amountInCents,
        currency,
        metadata,
        // Payment method types can be expanded as needed
        payment_method_types: ['card'],
      });
      
      res.status(200).json({
        success: true,
        clientSecret: paymentIntent.client_secret
      });
    } catch (error: any) {
      console.error('Error creating payment intent:', error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to create payment intent"
      });
    }
  });

  // Stripe webhook for handling events
  app.post("/api/stripe-webhook", async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'] as string;

    if (!sig) {
      return res.status(400).json({
        success: false,
        error: "Missing Stripe signature"
      });
    }

    try {
      // For webhook signatures, you should configure your webhook secret in production
      // const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      const event = req.body;

      // Handle different event types
      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
          // Here you'd update your database to mark the payment as successful
          break;
        case 'payment_intent.payment_failed':
          const failedPayment = event.data.object;
          console.log(`Payment failed for ${failedPayment.amount}: ${failedPayment.last_payment_error?.message}`);
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      res.status(200).json({ received: true });
    } catch (err: any) {
      console.error('Webhook error:', err.message);
      return res.status(400).json({
        success: false,
        error: `Webhook error: ${err.message}`
      });
    }
  });

  // ElevenLabs test and chat endpoints removed - feature deprecated

  // In serverless (Vercel), don't create an HTTP server
  // The Express app is used directly as the handler
  if (process.env.VERCEL) {
    return null as any;
  }

  const httpServer = createServer(app);
  return httpServer;
}
