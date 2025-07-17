import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserPreferencesSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API prefix for all routes
  const apiRouter = app;

  // Get user preferences
  apiRouter.get("/api/preferences/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const preferences = await storage.getUserPreferences(userId);
      
      if (!preferences) {
        return res.status(404).json({ message: "Preferences not found" });
      }
      
      res.json(preferences);
    } catch (error) {
      console.error("Error getting user preferences:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  // Save user preferences
  apiRouter.post("/api/preferences", async (req, res) => {
    try {
      const validatedData = insertUserPreferencesSchema.parse(req.body);
      
      const savedPreferences = await storage.saveUserPreferences(validatedData);
      
      res.status(201).json(savedPreferences);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      
      console.error("Error saving user preferences:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  // Update user preferences
  apiRouter.put("/api/preferences/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid preference ID" });
      }
      
      const validatedData = insertUserPreferencesSchema.parse(req.body);
      
      const updatedPreferences = await storage.updateUserPreferences(id, validatedData);
      
      if (!updatedPreferences) {
        return res.status(404).json({ message: "Preferences not found" });
      }
      
      res.json(updatedPreferences);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      
      console.error("Error updating user preferences:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
