import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema for potential future authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// User preferences schema for saving visualization settings
export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  algorithmId: text("algorithm_id").notNull(),
  arraySize: integer("array_size").notNull(),
  speed: integer("speed").notNull(),
  darkMode: boolean("dark_mode").default(false),
});

// Create schemas for data insertion
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertUserPreferencesSchema = createInsertSchema(userPreferences).pick({
  userId: true,
  algorithmId: true,
  arraySize: true,
  speed: true,
  darkMode: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertUserPreferences = z.infer<typeof insertUserPreferencesSchema>;
export type UserPreferences = typeof userPreferences.$inferSelect;
