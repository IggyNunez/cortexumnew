import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

// Function to create admin user if it doesn't exist
async function ensureAdminExists() {
  try {
    const adminUsername = "vibeadmin";
    const existingAdmin = await storage.getUserByUsername(adminUsername);
    
    if (!existingAdmin) {
      console.log("Creating admin user...");
      await storage.createUser({
        username: adminUsername,
        password: await hashPassword("aimoneymakers"),
      });
      console.log("Admin user created successfully");
    }
  } catch (error) {
    console.error("Error ensuring admin exists:", error);
  }
}

export function setupAuth(app: Express) {
  // Ensure admin user exists
  ensureAdminExists();
  
  // Using memorystore for session storage in development
  // In production, you would use a database store
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "vibe-marketing-agency-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  app.post("/api/register", async (req, res, next) => {
    // Registration is disabled for security purposes
    return res.status(403).json({
      success: false,
      error: "Public registration is disabled. Please contact the administrator."
    });
  });

  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err: Error | null, user: SelectUser | false, _info: any) => {
      if (err) return next(err);
      
      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Invalid username or password"
        });
      }
      
      req.login(user, (err: Error | null) => {
        if (err) return next(err);
        return res.status(200).json({
          success: true,
          data: user
        });
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.status(200).json({
        success: true,
        message: "Logged out successfully"
      });
    });
  });

  app.get("/api/user", (req, res) => {
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