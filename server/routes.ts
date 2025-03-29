import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertMaterialSchema, MaterialCategory, MATERIAL_CATEGORIES, SUBJECTS, YEAR_LEVELS } from "@shared/schema";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all materials
  app.get("/api/materials", async (req: Request, res: Response) => {
    const materials = await storage.getAllMaterials();
    res.json(materials);
  });

  // Get featured materials
  app.get("/api/materials/featured", async (req: Request, res: Response) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 4;
    const featuredMaterials = await storage.getFeaturedMaterials(limit);
    res.json(featuredMaterials);
  });

  // Get a single material by ID
  app.get("/api/materials/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const material = await storage.getMaterial(id);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }
    
    res.json(material);
  });

  // Search materials
  app.get("/api/materials/search/:query", async (req: Request, res: Response) => {
    const query = req.params.query;
    const results = await storage.searchMaterials(query);
    res.json(results);
  });

  // Get materials by category
  app.get("/api/materials/category/:category", async (req: Request, res: Response) => {
    const category = req.params.category as MaterialCategory;
    
    if (!MATERIAL_CATEGORIES.includes(category as any)) {
      return res.status(400).json({ message: "Invalid category" });
    }
    
    const materials = await storage.getMaterialsByCategory(category);
    res.json(materials);
  });

  // Get materials by subject
  app.get("/api/materials/subject/:subject", async (req: Request, res: Response) => {
    const subject = req.params.subject;
    
    if (!SUBJECTS.includes(subject as any)) {
      return res.status(400).json({ message: "Invalid subject" });
    }
    
    const materials = await storage.getMaterialsBySubject(subject as any);
    res.json(materials);
  });

  // Get materials by year level
  app.get("/api/materials/year-level/:yearLevel", async (req: Request, res: Response) => {
    const yearLevel = req.params.yearLevel;
    
    if (!YEAR_LEVELS.includes(yearLevel as any)) {
      return res.status(400).json({ message: "Invalid year level" });
    }
    
    const materials = await storage.getMaterialsByYearLevel(yearLevel as any);
    res.json(materials);
  });

  // Record a download (increment download count)
  app.post("/api/materials/:id/download", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const material = await storage.updateMaterialDownloads(id);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }
    
    res.json(material);
  });

  // Get category counts
  app.get("/api/categories/counts", async (req: Request, res: Response) => {
    const counts = await Promise.all(
      MATERIAL_CATEGORIES.map(async (category) => {
        const count = await storage.getCategoryCount(category);
        return { category, count };
      })
    );
    
    res.json(counts);
  });

  // Create material (for demo purposes)
  app.post("/api/materials", async (req: Request, res: Response) => {
    try {
      const validatedData = insertMaterialSchema.parse(req.body);
      const newMaterial = await storage.createMaterial(validatedData);
      res.status(201).json(newMaterial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid material data", errors: error.errors });
      }
      res.status(500).json({ message: "Could not create material" });
    }
  });

  // Serve files for download
  app.get("/api/download/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const material = await storage.getMaterial(id);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    // For the demo, we won't actually serve real files
    // In a real app, this would serve the actual file
    // This endpoint is just to track downloads
    await storage.updateMaterialDownloads(id);

    // Respond with a mock PDF file path (you'd need an actual file in a real app)
    const filePath = path.join(__dirname, '..', 'public', 'sample.pdf');
    
    // In a real implementation, you would check if the file exists
    // and serve it if it does, or return a 404 if it doesn't
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${material.title.replace(/\s+/g, '-')}.pdf"`);
    
    // For demo, we'll just send a response that the file would be downloaded
    res.status(200).json({ message: "Download started", material });
  });

  const httpServer = createServer(app);
  return httpServer;
}
