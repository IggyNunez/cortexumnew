import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "../server/routes";
import { type IncomingMessage, type ServerResponse } from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Force HTTPS in production
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && !req.secure && req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});

// Add security headers
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  const cspDirectives = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.elevenlabs.io https://api.stripe.com https://api-platform.hume.ai; frame-src 'self' https://js.stripe.com;";
  res.setHeader('Content-Security-Policy', cspDirectives);

  next();
});

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
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
        logLine = logLine.slice(0, 79) + "…";
      }
      console.log(logLine);
    }
  });

  next();
});

// Health check endpoint (no dependencies required)
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Register all API routes
let routesRegistered = false;
let routePromise: Promise<void> | null = null;

async function ensureRoutes() {
  if (routesRegistered) return;
  if (routePromise) return routePromise;

  routePromise = (async () => {
    try {
      console.log("[API] Starting route registration...");
      await registerRoutes(app);
      console.log("[API] Routes registered successfully");

      // Error handler
      app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
        const status = err.status || err.statusCode || 500;
        const message = err.message || "Internal Server Error";
        console.error("[API] Express error:", message);
        res.status(status).json({ message });
      });

      routesRegistered = true;
    } catch (error) {
      console.error("[API] Failed to register routes:", error);
      // Reset so it can be retried
      routePromise = null;
      throw error;
    }
  })();

  return routePromise;
}

// Vercel serverless handler
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    await ensureRoutes();
    app(req, res);
  } catch (error: any) {
    console.error("[API] Handler error:", error?.message || error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      error: "Internal Server Error",
      message: error?.message || "Unknown error during initialization"
    }));
  }
}
