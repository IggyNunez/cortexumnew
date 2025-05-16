import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertLeadSchema, insertConversationSchema, insertLeadMilestoneSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import Stripe from "stripe";
import { sendLeadNotification } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  setupAuth(app);
  
  // Initialize Stripe
  if (!process.env.STRIPE_SECRET_KEY) {
    console.warn('Missing required Stripe secret: STRIPE_SECRET_KEY');
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-04-30.basil',
  });
  
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

  // ElevenLabs API integration for speech synthesis
  app.post("/api/synthesize", async (req: Request, res: Response) => {
    try {
      const { text } = req.body;
      
      if (!text) {
        return res.status(400).json({ 
          success: false, 
          error: "Text is required" 
        });
      }
      
      // Use "Sarah" voice - a professional sounding female voice
      const voiceId = 'EXAVITQu4vr4xnSDxMaL';
      const apiUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
      
      // Log the synthesis request
      console.log("Speech synthesis request received for text:", text.substring(0, 50) + (text.length > 50 ? "..." : ""));
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': process.env.ELEVENLABS_API_KEY || '',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2', // Using best available model
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.75,
            style: 0.5,
            use_speaker_boost: true
          }
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('ElevenLabs API error in synthesize:', errorText);
        throw new Error('ElevenLabs API request failed: ' + errorText);
      }
      
      // Get audio blob from response
      const audioBuffer = await response.arrayBuffer();
      
      console.log("Audio synthesis successful, size:", Math.round(audioBuffer.byteLength / 1024), "KB");
      
      // Send the audio data back to the client
      res.set('Content-Type', 'audio/mpeg');
      res.send(Buffer.from(audioBuffer));
    } catch (error) {
      console.error("Error processing speech synthesis request:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to process speech synthesis request" 
      });
    }
  });
  
  // Direct audio file from text endpoint - both GET and POST supported
  app.get("/api/generate-audio", async (req: Request, res: Response) => {
    try {
      const text = req.query.message as string;
      
      if (!text) {
        return res.status(400).json({
          success: false,
          error: "Text message is required as a query parameter"
        });
      }
      
      // Use "Sarah" voice
      const voiceId = 'EXAVITQu4vr4xnSDxMaL';
      const apiUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
      
      // Log the synthesis request
      console.log("Audio generation GET request received for text:", text.substring(0, 50) + (text.length > 50 ? "..." : ""));
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': process.env.ELEVENLABS_API_KEY || '',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.75,
            style: 0.5,
            use_speaker_boost: true
          }
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('ElevenLabs API error in GET generate-audio:', errorText);
        throw new Error('ElevenLabs audio generation failed: ' + errorText);
      }
      
      // Get audio data directly from response
      const audioBuffer = await response.arrayBuffer();
      
      console.log("Audio generation (GET) successful, size:", Math.round(audioBuffer.byteLength / 1024), "KB");
      
      // Send the audio file directly to client
      res.set('Content-Type', 'audio/mpeg');
      res.set('Content-Disposition', 'attachment; filename="response.mp3"');
      res.set('Cache-Control', 'no-cache');
      res.send(Buffer.from(audioBuffer));
      
    } catch (error) {
      console.error("Error generating audio (GET):", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to generate audio response" 
      });
    }
  });
  
  app.post("/api/generate-audio", async (req: Request, res: Response) => {
    try {
      const { text } = req.body;
      
      if (!text) {
        return res.status(400).json({ 
          success: false, 
          error: "Text is required" 
        });
      }
      
      // Use "Sarah" voice
      const voiceId = 'EXAVITQu4vr4xnSDxMaL';
      const apiUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
      
      // Log the synthesis request
      console.log("Audio generation request received for text:", text.substring(0, 50) + (text.length > 50 ? "..." : ""));
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': process.env.ELEVENLABS_API_KEY || '',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.75,
            style: 0.5,
            use_speaker_boost: true
          }
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('ElevenLabs API error:', errorText);
        throw new Error('ElevenLabs audio generation failed: ' + errorText);
      }
      
      // Get audio data directly from response
      const audioBuffer = await response.arrayBuffer();
      
      console.log("Audio generation successful, size:", Math.round(audioBuffer.byteLength / 1024), "KB");
      
      // Send the audio file directly to client
      res.set('Content-Type', 'audio/mpeg');
      res.set('Content-Disposition', 'attachment; filename="response.mp3"');
      res.set('Cache-Control', 'no-cache');
      res.send(Buffer.from(audioBuffer));
      
    } catch (error) {
      console.error("Error generating audio:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to generate audio response" 
      });
    }
  });

  // Combined chat and speech synthesis endpoint
  app.post("/api/elevenlabs/chat-with-voice", async (req: Request, res: Response) => {
    try {
      const { message, history = [] } = req.body;
      
      if (!message) {
        return res.status(400).json({ 
          success: false, 
          error: "Message is required" 
        });
      }
      
      // Log the chat request
      console.log("Voice chat request received:", message.substring(0, 50) + (message.length > 50 ? "..." : ""));
      
      // First get text response (using our existing chat logic)
      let textResponse = "";
      
      try {
        // Use the fallback pattern matching since the text generation API isn't working
        const lowercaseMessage = message.toLowerCase();
        
        if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi') || lowercaseMessage.includes('hey')) {
          textResponse = "Hello! I'm your AI marketing assistant. How can I help you today?";
        } else if (lowercaseMessage.includes('marketing') && (lowercaseMessage.includes('help') || lowercaseMessage.includes('service'))) {
          textResponse = "We offer a wide range of AI-powered marketing services including content generation, media buying strategies, audience analysis, and predictive campaign optimization. Would you like to know more about any specific service?";
        } else if (lowercaseMessage.includes('content') || lowercaseMessage.includes('blog') || lowercaseMessage.includes('article')) {
          textResponse = "Our AI content generation services help create engaging, SEO-optimized content that resonates with your target audience. We can create blog posts, social media content, email campaigns, and more!";
        } else if (lowercaseMessage.includes('price') || lowercaseMessage.includes('cost') || lowercaseMessage.includes('package')) {
          textResponse = "Our pricing depends on your specific needs. We offer custom packages starting at $999/month for small businesses. Would you like to schedule a call to discuss a personalized solution?";
        } else if (lowercaseMessage.includes('book') || lowercaseMessage.includes('schedule') || lowercaseMessage.includes('call') || lowercaseMessage.includes('consultation')) {
          textResponse = "Great! You can book a call with our team at https://calendly.com/cortexuummarketing/30min. We look forward to discussing how we can help your business grow!";
        } else if (lowercaseMessage.includes('social media') || lowercaseMessage.includes('facebook') || lowercaseMessage.includes('instagram') || lowercaseMessage.includes('linkedin')) {
          textResponse = "Our social media marketing services leverage AI to create engaging content, optimize posting schedules, and target the right audience for maximum engagement and conversion.";
        } else if (lowercaseMessage.includes('seo') || lowercaseMessage.includes('search engine')) {
          textResponse = "Our AI-powered SEO services help improve your website's visibility in search results. We analyze key metrics, identify trending topics in your industry, and optimize your content to rank higher.";
        } else if (lowercaseMessage.includes('email') || lowercaseMessage.includes('newsletter')) {
          textResponse = "Our email marketing services use AI to segment your audience, personalize content, and optimize send times for maximum open and conversion rates.";
        } else if (lowercaseMessage.includes('thank')) {
          textResponse = "You're welcome! Is there anything else I can help you with today?";
        } else if (lowercaseMessage.includes('bye') || lowercaseMessage.includes('goodbye')) {
          textResponse = "Thank you for chatting! If you'd like to learn more about our services or schedule a consultation, feel free to book a call at any time. Have a great day!";
        } else {
          textResponse = "Thank you for your message. Our AI-powered marketing solutions can help your business grow with data-driven strategies. Would you like to learn more about our specific services or schedule a consultation?";
        }
        
      } catch (error) {
        console.error("Error generating text response:", error);
        textResponse = "I'm sorry, I couldn't process your request at the moment. Can you please try again?";
      }
      
      // Generate a unique ID for this message
      const messageId = Date.now().toString();
      
      // Return the text response with a URL to fetch the audio
      res.status(200).json({
        success: true,
        response: textResponse,
        audioUrl: `/api/generate-audio?message=${encodeURIComponent(textResponse)}&id=${messageId}`,
        messageId
      });
      
    } catch (error: any) {
      console.error("Error processing voice chat request:", error);
      res.status(500).json({ 
        success: false, 
        error: error.message || "Failed to process voice chat request" 
      });
    }
  });

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
      
      const paymentIntent = await stripe.paymentIntents.create({
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

  // Test ElevenLabs API connection
  app.get("/api/elevenlabs/test", async (_req: Request, res: Response) => {
    try {
      console.log("Testing ElevenLabs API connection...");
      
      const response = await fetch('https://api.elevenlabs.io/v1/models', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': process.env.ELEVENLABS_API_KEY || '',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('ElevenLabs API error:', errorText);
        throw new Error('ElevenLabs API request failed: ' + errorText);
      }
      
      const data = await response.json();
      console.log('ElevenLabs API test successful:', data.length ? `${data.length} models available` : 'No models available');
      
      res.status(200).json({
        success: true,
        message: 'ElevenLabs API connection successful',
        models: data
      });
    } catch (error: any) {
      console.error("Error testing ElevenLabs API:", error);
      res.status(500).json({ 
        success: false, 
        error: error.message || "Failed to test ElevenLabs API connection"
      });
    }
  });
  
  // ElevenLabs Chat API integration using ElevenLabs API
  app.post("/api/elevenlabs/chat", async (req: Request, res: Response) => {
    try {
      const { message, history = [] } = req.body;
      
      if (!message) {
        return res.status(400).json({ 
          success: false, 
          error: "Message is required" 
        });
      }
      
      // Log the chat request
      console.log("Chat request received:", message.substring(0, 50) + (message.length > 50 ? "..." : ""));
      
      try {
        // First attempt to use the ElevenLabs API
        // Using the text generation endpoint instead
        const modelId = "eleven_monolingual_v1"; // Using available model from the API test
        const apiUrl = `https://api.elevenlabs.io/v1/text-generation/generate-text`;
        
        // Format prompt with context about Cortexuum AI Marketing
        let prompt = "You are an AI assistant for Cortexuum AI Marketing Agency. ";
        prompt += "Provide helpful, accurate information about our AI marketing services. ";
        prompt += "Our services include content generation, media buying, audience analysis, ";
        prompt += "and social media management, all powered by AI. ";
        prompt += "If asked about booking a call, direct users to https://calendly.com/cortexuummarketing/30min. ";
        prompt += "Be friendly, professional, and concise in your responses. ";
        prompt += "User question: " + message;
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': process.env.ELEVENLABS_API_KEY || '',
          },
          body: JSON.stringify({
            model_id: modelId,
            prompt: prompt,
            temperature: 0.7,
            max_tokens: 150
          }),
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('ElevenLabs API error:', errorText);
          throw new Error('ElevenLabs API request failed: ' + errorText);
        }
        
        const data = await response.json();
        
        // Send the AI-generated response back to the client
        res.status(200).json({
          success: true,
          response: data.text || data.output || data.generated_text || "I'm sorry, I couldn't process your request. Please try again."
        });
        
      } catch (apiError) {
        console.error("Error with ElevenLabs API, falling back to pattern matching:", apiError);
        
        // Fall back to pattern matching if the API fails
        let response: string;
        const lowercaseMessage = message.toLowerCase();
        
        if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi') || lowercaseMessage.includes('hey')) {
          response = "Hello! I'm your AI marketing assistant. How can I help you today?";
        } else if (lowercaseMessage.includes('marketing') && (lowercaseMessage.includes('help') || lowercaseMessage.includes('service'))) {
          response = "We offer a wide range of AI-powered marketing services including content generation, media buying strategies, audience analysis, and predictive campaign optimization. Would you like to know more about any specific service?";
        } else if (lowercaseMessage.includes('content') || lowercaseMessage.includes('blog') || lowercaseMessage.includes('article')) {
          response = "Our AI content generation services help create engaging, SEO-optimized content that resonates with your target audience. We can create blog posts, social media content, email campaigns, and more!";
        } else if (lowercaseMessage.includes('price') || lowercaseMessage.includes('cost') || lowercaseMessage.includes('package')) {
          response = "Our pricing depends on your specific needs. We offer custom packages starting at $999/month for small businesses. Would you like to schedule a call to discuss a personalized solution?";
        } else if (lowercaseMessage.includes('book') || lowercaseMessage.includes('schedule') || lowercaseMessage.includes('call') || lowercaseMessage.includes('consultation')) {
          response = "Great! You can book a call with our team at https://calendly.com/cortexuummarketing/30min. We look forward to discussing how we can help your business grow!";
        } else if (lowercaseMessage.includes('social media') || lowercaseMessage.includes('facebook') || lowercaseMessage.includes('instagram') || lowercaseMessage.includes('linkedin')) {
          response = "Our social media marketing services leverage AI to create engaging content, optimize posting schedules, and target the right audience for maximum engagement and conversion.";
        } else if (lowercaseMessage.includes('seo') || lowercaseMessage.includes('search engine')) {
          response = "Our AI-powered SEO services help improve your website's visibility in search results. We analyze key metrics, identify trending topics in your industry, and optimize your content to rank higher.";
        } else if (lowercaseMessage.includes('email') || lowercaseMessage.includes('newsletter')) {
          response = "Our email marketing services use AI to segment your audience, personalize content, and optimize send times for maximum open and conversion rates.";
        } else if (lowercaseMessage.includes('thank')) {
          response = "You're welcome! Is there anything else I can help you with today?";
        } else if (lowercaseMessage.includes('bye') || lowercaseMessage.includes('goodbye')) {
          response = "Thank you for chatting! If you'd like to learn more about our services or schedule a consultation, feel free to book a call at any time. Have a great day!";
        } else {
          response = "Thank you for your message. Our AI-powered marketing solutions can help your business grow with data-driven strategies. Would you like to learn more about our specific services or schedule a consultation?";
        }
        
        // Send the fallback response back to the client
        res.status(200).json({
          success: true,
          response: response
        });
      }
      
    } catch (error: any) {
      console.error("Error processing chat request:", error);
      res.status(500).json({ 
        success: false, 
        error: error.message || "Failed to process chat request" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
