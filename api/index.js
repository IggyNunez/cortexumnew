var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// api/index.ts
import express from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  conversations: () => conversations,
  insertConversationSchema: () => insertConversationSchema,
  insertLeadMilestoneSchema: () => insertLeadMilestoneSchema,
  insertLeadSchema: () => insertLeadSchema,
  insertMarketingSettingsSchema: () => insertMarketingSettingsSchema,
  insertPageReviewSchema: () => insertPageReviewSchema,
  insertUserSchema: () => insertUserSchema,
  leadMilestones: () => leadMilestones,
  leads: () => leads,
  marketingSettings: () => marketingSettings,
  pageReviews: () => pageReviews,
  users: () => users
});
import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var leads = pgTable("leads", {
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
  created_at: timestamp("created_at").defaultNow().notNull()
});
var insertLeadSchema = createInsertSchema(leads).pick({
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
  source: true
});
var conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  visitor_id: text("visitor_id").notNull(),
  message_text: text("message_text").notNull(),
  is_bot: boolean("is_bot").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull()
});
var insertConversationSchema = createInsertSchema(conversations).pick({
  visitor_id: true,
  message_text: true,
  is_bot: true
});
var leadMilestones = pgTable("lead_milestones", {
  id: serial("id").primaryKey(),
  lead_id: integer("lead_id").notNull(),
  milestone_id: text("milestone_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  completed: boolean("completed").notNull().default(false),
  completed_at: timestamp("completed_at"),
  created_at: timestamp("created_at").defaultNow().notNull()
});
var insertLeadMilestoneSchema = createInsertSchema(leadMilestones).pick({
  lead_id: true,
  milestone_id: true,
  title: true,
  description: true,
  completed: true,
  completed_at: true
});
var marketingSettings = pgTable("marketing_settings", {
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
  updated_at: timestamp("updated_at").defaultNow().notNull()
});
var insertMarketingSettingsSchema = createInsertSchema(marketingSettings).pick({
  ga_enabled: true,
  ga_measurement_id: true,
  ga_settings: true,
  fb_capi_enabled: true,
  fb_pixel_id: true,
  fb_access_token: true,
  fb_settings: true
});
var pageReviews = pgTable("page_reviews", {
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
  created_at: timestamp("created_at").defaultNow().notNull()
});
var insertPageReviewSchema = createInsertSchema(pageReviews).pick({
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
  source: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL must be set. Did you forget to provision a database?");
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL || "" });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, desc, and } from "drizzle-orm";
var DatabaseStorage = class {
  // User methods
  async getUser(id) {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result.length ? result[0] : void 0;
  }
  async getUserByUsername(username) {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result.length ? result[0] : void 0;
  }
  async createUser(insertUser) {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }
  // Lead methods
  async createLead(insertLead) {
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
  async getLeads() {
    return await db.select().from(leads).orderBy(desc(leads.created_at));
  }
  async getLead(id) {
    const result = await db.select().from(leads).where(eq(leads.id, id));
    return result.length ? result[0] : void 0;
  }
  // Conversation methods
  async saveConversation(insertConversation) {
    const result = await db.insert(conversations).values(insertConversation).returning();
    return result[0];
  }
  async getConversationsByVisitorId(visitorId) {
    return await db.select().from(conversations).where(eq(conversations.visitor_id, visitorId)).orderBy(conversations.created_at);
  }
  // Lead milestone methods
  async createLeadMilestone(milestone) {
    const [result] = await db.insert(leadMilestones).values(milestone).returning();
    return result;
  }
  async updateLeadMilestone(id, updates) {
    const [result] = await db.update(leadMilestones).set(updates).where(eq(leadMilestones.id, id)).returning();
    return result;
  }
  async getLeadMilestones(leadId) {
    return await db.select().from(leadMilestones).where(eq(leadMilestones.lead_id, leadId)).orderBy(leadMilestones.created_at);
  }
  async getLeadMilestone(id) {
    const [result] = await db.select().from(leadMilestones).where(eq(leadMilestones.id, id));
    return result;
  }
  async getLeadMilestoneByIds(leadId, milestoneId) {
    const [result] = await db.select().from(leadMilestones).where(
      and(
        eq(leadMilestones.lead_id, leadId),
        eq(leadMilestones.milestone_id, milestoneId)
      )
    );
    return result;
  }
  // Marketing settings methods
  async getMarketingSettings() {
    const results = await db.select().from(marketingSettings).limit(1);
    return results.length ? results[0] : void 0;
  }
  async createMarketingSettings(settings) {
    const [result] = await db.insert(marketingSettings).values(settings).returning();
    return result;
  }
  async updateMarketingSettings(id, updates) {
    const [result] = await db.update(marketingSettings).set({
      ...updates,
      updated_at: /* @__PURE__ */ new Date()
    }).where(eq(marketingSettings.id, id)).returning();
    return result;
  }
  // Page review methods
  async createPageReview(review) {
    const [result] = await db.insert(pageReviews).values({
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
    }).returning();
    return result;
  }
  async getPageReviews() {
    return await db.select().from(pageReviews).orderBy(desc(pageReviews.created_at));
  }
  async getPageReview(id) {
    const [result] = await db.select().from(pageReviews).where(eq(pageReviews.id, id));
    return result;
  }
};
var storage = new DatabaseStorage();

// server/auth.ts
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
var scryptAsync = promisify(scrypt);
async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}
async function comparePasswords(supplied, stored) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = await scryptAsync(supplied, salt, 64);
  return timingSafeEqual(hashedBuf, suppliedBuf);
}
async function ensureAdminExists() {
  try {
    const adminUsername = "vibeadmin";
    const existingAdmin = await storage.getUserByUsername(adminUsername);
    if (!existingAdmin) {
      console.log("Creating admin user...");
      await storage.createUser({
        username: adminUsername,
        password: await hashPassword("aimoneymakers")
      });
      console.log("Admin user created successfully");
    }
  } catch (error) {
    console.error("Error ensuring admin exists:", error);
  }
}
function setupAuth(app2) {
  ensureAdminExists().catch((err) => console.error("ensureAdminExists failed:", err));
  const PgSession = connectPgSimple(session);
  const sessionSettings = {
    store: new PgSession({
      pool,
      tableName: "session",
      createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET || "vibe-marketing-agency-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1e3
      // 24 hours
    }
  };
  app2.set("trust proxy", 1);
  app2.use(session(sessionSettings));
  app2.use(passport.initialize());
  app2.use(passport.session());
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !await comparePasswords(password, user.password)) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    })
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
  app2.post("/api/register", async (req, res, next) => {
    return res.status(403).json({
      success: false,
      error: "Public registration is disabled. Please contact the administrator."
    });
  });
  app2.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err, user, _info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Invalid username or password"
        });
      }
      req.login(user, (err2) => {
        if (err2) return next(err2);
        return res.status(200).json({
          success: true,
          data: user
        });
      });
    })(req, res, next);
  });
  app2.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.status(200).json({
        success: true,
        message: "Logged out successfully"
      });
    });
  });
  app2.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        success: false,
        error: "Not authenticated"
      });
    }
    res.status(200).json({
      success: true,
      data: req.user
    });
  });
}

// server/routes.ts
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import Stripe from "stripe";

// server/email.ts
import { Resend } from "resend";
var _resend = null;
function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}
var FROM_EMAIL = "Cortexuum <no-reply@cortexuum.com>";
var NOTIFICATION_RECIPIENTS = [
  "christian@cortexuum.com",
  "dev@ignacionunez.dev"
];
async function sendLeadNotification(lead) {
  const resend = getResend();
  if (!resend) {
    console.error("RESEND_API_KEY environment variable is not set");
    return false;
  }
  try {
    const { htmlContent, textContent, subject } = formatLeadEmail(lead);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFICATION_RECIPIENTS,
      replyTo: lead.email,
      subject,
      html: htmlContent,
      text: textContent
    });
    if (error) {
      console.error("Resend error:", error);
      return false;
    }
    console.log(`Lead notification sent for ${lead.name}`);
    return true;
  } catch (error) {
    console.error("Failed to send lead notification email:", error);
    return false;
  }
}
function formatLeadEmail(lead) {
  const submittedAt = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  const isPageReview = lead.business_type === "Landing Page Review";
  const subject = isPageReview ? `\u{1F50D} New Page Review Request \u2014 ${lead.name}` : `\u{1F680} New Lead \u2014 ${lead.name}${lead.company ? ` from ${lead.company}` : ""}`;
  const fields = buildFields(lead, isPageReview);
  const textContent = [
    isPageReview ? "New Landing Page Review Request" : "New Lead Submission",
    "\u2500".repeat(40),
    ...fields.map((f) => `${f.label}: ${f.value}`),
    "",
    `Submitted: ${submittedAt}`
  ].join("\n");
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Logo / Brand -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <span style="font-size:28px;font-weight:800;letter-spacing:-0.5px;color:#ffffff;">CORTEXUUM</span>
              <span style="display:block;font-size:11px;letter-spacing:3px;color:#7c5cfc;text-transform:uppercase;margin-top:2px;">AI Marketing</span>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td style="background:linear-gradient(145deg,#141420 0%,#1a1a2e 100%);border:1px solid #2a2a40;border-radius:16px;overflow:hidden;">

              <!-- Header Bar -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(135deg,#7c5cfc 0%,#5b3fd4 50%,#4a2fb3 100%);padding:24px 32px;">
                    <span style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.7);font-weight:600;">${isPageReview ? "Page Review Request" : "New Lead"}</span>
                    <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:#ffffff;line-height:1.3;">
                      ${lead.name}
                    </h1>
                    ${lead.company && !isPageReview ? `<span style="font-size:14px;color:rgba(255,255,255,0.8);">${lead.company}</span>` : ""}
                  </td>
                </tr>
              </table>

              <!-- Quick Actions -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:20px 32px 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        ${lead.email ? `
                        <td style="padding-right:12px;">
                          <a href="mailto:${lead.email}" style="display:inline-block;padding:8px 18px;background:#7c5cfc;color:#fff;font-size:13px;font-weight:600;text-decoration:none;border-radius:8px;">Reply to Lead</a>
                        </td>` : ""}
                        ${lead.phone ? `
                        <td>
                          <a href="tel:${lead.phone}" style="display:inline-block;padding:8px 18px;background:rgba(124,92,252,0.15);color:#a78bfa;font-size:13px;font-weight:600;text-decoration:none;border-radius:8px;border:1px solid rgba(124,92,252,0.3);">Call ${lead.phone}</a>
                        </td>` : ""}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Fields -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:24px 32px 32px;">
                    ${fields.map(
    (f) => `
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:${f.isLong ? "16px" : "12px"};">
                      <tr>
                        <td style="padding:${f.isLong ? "14px 16px" : "10px 16px"};background:rgba(255,255,255,0.03);border-radius:10px;border:1px solid rgba(255,255,255,0.06);">
                          <span style="display:block;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#7c5cfc;font-weight:600;margin-bottom:4px;">${f.label}</span>
                          <span style="display:block;font-size:${f.isLong ? "14px" : "15px"};color:#e0e0e0;line-height:1.5;${f.isLong ? "white-space:pre-wrap;" : ""}">${f.value}</span>
                        </td>
                      </tr>
                    </table>`
  ).join("")}
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:28px 20px 0;">
              <span style="font-size:12px;color:#555;line-height:1.6;">
                Submitted ${submittedAt}<br/>
                Cortexuum AI Marketing \u2014 Lead Notification
              </span>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  return { htmlContent, textContent, subject };
}
function buildFields(lead, isPageReview) {
  const fields = [];
  fields.push({ label: "Name", value: lead.name });
  fields.push({ label: "Email", value: lead.email });
  if (lead.phone) {
    fields.push({ label: "Phone", value: lead.phone });
  }
  if (isPageReview) {
    if (lead.company) {
      fields.push({ label: "Website", value: lead.company });
    }
    if (lead.message) {
      fields.push({ label: "Details", value: lead.message, isLong: true });
    }
  } else {
    if (lead.company) {
      fields.push({ label: "Company", value: lead.company });
    }
    if (lead.business_type) {
      fields.push({ label: "Business Type", value: lead.business_type });
    }
    if (lead.company_size) {
      fields.push({ label: "Company Size", value: lead.company_size });
    }
    if (lead.annual_revenue) {
      fields.push({ label: "Annual Revenue", value: lead.annual_revenue });
    }
    if (lead.client_value) {
      fields.push({ label: "Avg Client Value", value: lead.client_value });
    }
    if (lead.marketing_needs) {
      fields.push({ label: "Marketing Needs", value: lead.marketing_needs });
    }
    if (lead.timeline) {
      fields.push({ label: "Timeline", value: lead.timeline });
    }
    if (lead.budget) {
      fields.push({ label: "Budget", value: lead.budget });
    }
    if (lead.message) {
      fields.push({ label: "Message", value: lead.message, isLong: true });
    }
  }
  if (lead.source) {
    fields.push({ label: "Source", value: lead.source });
  }
  return fields;
}

// server/googleSheets.ts
async function addLeadToSheet(lead) {
  console.log("Google Sheets integration not available - skipping sheet update");
  return;
}

// server/routes.ts
async function registerRoutes(app2) {
  setupAuth(app2);
  let stripe = null;
  function getStripe() {
    if (!stripe) {
      if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("STRIPE_SECRET_KEY is not configured");
      }
      stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2025-04-30.basil"
      });
    }
    return stripe;
  }
  const requireAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        success: false,
        error: "Authentication required"
      });
    }
    next();
  };
  app2.post("/api/leads", async (req, res) => {
    try {
      const lead = insertLeadSchema.parse(req.body);
      const createdLead = await storage.createLead(lead);
      try {
        await sendLeadNotification(createdLead);
      } catch (emailError) {
        console.error("Error sending lead notification email:", emailError);
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
  app2.get("/api/leads", requireAuth, async (_req, res) => {
    try {
      const leads2 = await storage.getLeads();
      res.status(200).json({ success: true, data: leads2 });
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch leads"
      });
    }
  });
  app2.get("/api/leads/export", requireAuth, async (_req, res) => {
    try {
      const leads2 = await storage.getLeads();
      if (leads2.length === 0) {
        return res.status(404).json({
          success: false,
          error: "No leads to export"
        });
      }
      const csvHeader = [
        "id",
        "name",
        "email",
        "company",
        "phone",
        "message",
        "business_type",
        "company_size",
        "annual_revenue",
        "client_value",
        "marketing_needs",
        "timeline",
        "budget",
        "source",
        "created_at"
      ].join(",");
      const csvRows = leads2.map((lead) => {
        return [
          lead.id,
          `"${lead.name || ""}"`,
          `"${lead.email || ""}"`,
          `"${lead.company || ""}"`,
          `"${lead.phone || ""}"`,
          `"${lead.message || ""}"`,
          `"${lead.business_type || ""}"`,
          `"${lead.company_size || ""}"`,
          `"${lead.annual_revenue || ""}"`,
          `"${lead.client_value || ""}"`,
          `"${lead.marketing_needs || ""}"`,
          `"${lead.timeline || ""}"`,
          `"${lead.budget || ""}"`,
          `"${lead.source || ""}"`,
          lead.created_at ? new Date(lead.created_at).toISOString() : ""
        ].join(",");
      });
      const csv = [csvHeader, ...csvRows].join("\n");
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename="leads-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv"`);
      res.send(csv);
    } catch (error) {
      console.error("Error exporting leads:", error);
      res.status(500).json({
        success: false,
        error: "Failed to export leads"
      });
    }
  });
  app2.get("/api/leads/:id", requireAuth, async (req, res) => {
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
  app2.post("/api/conversations", async (req, res) => {
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
  app2.get("/api/conversations/:visitorId", async (req, res) => {
    try {
      const { visitorId } = req.params;
      const conversations2 = await storage.getConversationsByVisitorId(visitorId);
      res.status(200).json({ success: true, data: conversations2 });
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch conversations"
      });
    }
  });
  app2.get("/api/leads/:leadId/milestones", async (req, res) => {
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
  app2.post("/api/leads/:leadId/milestones", async (req, res) => {
    try {
      const leadId = parseInt(req.params.leadId);
      if (isNaN(leadId)) {
        return res.status(400).json({
          success: false,
          error: "Invalid lead ID"
        });
      }
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
  app2.patch("/api/leads/milestones/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: "Invalid milestone ID"
        });
      }
      const updates = req.body;
      if (updates.completed === true) {
        updates.completed_at = /* @__PURE__ */ new Date();
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
  app2.post("/api/page-reviews", async (req, res) => {
    try {
      const review = insertPageReviewSchema.parse(req.body);
      const createdReview = await storage.createPageReview(review);
      try {
        await sendLeadNotification({
          id: createdReview.id,
          name: createdReview.name,
          email: createdReview.email,
          company: createdReview.website_url,
          phone: createdReview.phone || "",
          message: `Landing Page Review Request

Website: ${createdReview.website_url}
Goal: ${createdReview.page_goal}
Target Audience: ${createdReview.target_audience}
Offer: ${createdReview.offer_description}
Why Right Choice: ${createdReview.why_right_choice}
Objections: ${createdReview.common_objections || "N/A"}
Monthly Traffic: ${createdReview.monthly_traffic}`,
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
  app2.get("/api/page-reviews", requireAuth, async (_req, res) => {
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
  app2.get("/api/marketing-settings", requireAuth, async (_req, res) => {
    try {
      const settings = await storage.getMarketingSettings();
      if (!settings) {
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
  app2.patch("/api/marketing-settings/:id", async (req, res) => {
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
  app2.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, currency = "usd", metadata = {} } = req.body;
      if (!amount || isNaN(parseFloat(amount))) {
        return res.status(400).json({
          success: false,
          error: "Valid amount is required"
        });
      }
      const amountInCents = Math.round(parseFloat(amount) * 100);
      const paymentIntent = await getStripe().paymentIntents.create({
        amount: amountInCents,
        currency,
        metadata,
        // Payment method types can be expanded as needed
        payment_method_types: ["card"]
      });
      res.status(200).json({
        success: true,
        clientSecret: paymentIntent.client_secret
      });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to create payment intent"
      });
    }
  });
  app2.post("/api/stripe-webhook", async (req, res) => {
    const sig = req.headers["stripe-signature"];
    if (!sig) {
      return res.status(400).json({
        success: false,
        error: "Missing Stripe signature"
      });
    }
    try {
      const event = req.body;
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntent = event.data.object;
          console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
          break;
        case "payment_intent.payment_failed":
          const failedPayment = event.data.object;
          console.log(`Payment failed for ${failedPayment.amount}: ${failedPayment.last_payment_error?.message}`);
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
      res.status(200).json({ received: true });
    } catch (err) {
      console.error("Webhook error:", err.message);
      return res.status(400).json({
        success: false,
        error: `Webhook error: ${err.message}`
      });
    }
  });
  if (process.env.VERCEL) {
    return null;
  }
  const httpServer = createServer(app2);
  return httpServer;
}

// api/index.ts
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production" && !req.secure && req.headers["x-forwarded-proto"] !== "https") {
    return res.redirect("https://" + req.headers.host + req.url);
  }
  next();
});
app.use((req, res, next) => {
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  const cspDirectives = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.elevenlabs.io https://api.stripe.com https://api-platform.hume.ai; frame-src 'self' https://js.stripe.com;";
  res.setHeader("Content-Security-Policy", cspDirectives);
  next();
});
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      console.log(logLine);
    }
  });
  next();
});
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
});
var routesRegistered = false;
var routePromise = null;
async function ensureRoutes() {
  if (routesRegistered) return;
  if (routePromise) return routePromise;
  routePromise = (async () => {
    try {
      console.log("[API] Starting route registration...");
      await registerRoutes(app);
      console.log("[API] Routes registered successfully");
      app.use((err, _req, res, _next) => {
        const status = err.status || err.statusCode || 500;
        const message = err.message || "Internal Server Error";
        console.error("[API] Express error:", message);
        res.status(status).json({ message });
      });
      routesRegistered = true;
    } catch (error) {
      console.error("[API] Failed to register routes:", error);
      routePromise = null;
      throw error;
    }
  })();
  return routePromise;
}
async function handler(req, res) {
  try {
    await ensureRoutes();
    app(req, res);
  } catch (error) {
    console.error("[API] Handler error:", error?.message || error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      error: "Internal Server Error",
      message: error?.message || "Unknown error during initialization"
    }));
  }
}
export {
  handler as default
};
