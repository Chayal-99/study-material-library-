import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Material categories
export const MATERIAL_CATEGORIES = ["book", "notes", "past_paper", "research"] as const;
export type MaterialCategory = typeof MATERIAL_CATEGORIES[number];

// Subject list - Only for BSc subjects at GHS Govt. PG College
export const SUBJECTS = [
  "mathematics", 
  "physics", 
  "chemistry"
] as const;
export type Subject = typeof SUBJECTS[number];

// Year level for BSc program
export const YEAR_LEVELS = ["bsc_first_year", "bsc_second_year", "bsc_third_year"] as const;
export type YearLevel = typeof YEAR_LEVELS[number];

// Study materials schema
export const materials = pgTable("materials", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  subject: text("subject").notNull(),
  yearLevel: text("year_level"),
  author: text("author"),
  institution: text("institution"),
  filePath: text("file_path").notNull(),
  coverImage: text("cover_image").notNull(),
  downloads: integer("downloads").default(0).notNull(),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMaterialSchema = createInsertSchema(materials).omit({
  id: true,
  downloads: true,
  createdAt: true,
});

export type InsertMaterial = z.infer<typeof insertMaterialSchema>;
export type Material = typeof materials.$inferSelect;
