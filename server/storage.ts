import { 
  users, type User, type InsertUser,
  materials, type Material, type InsertMaterial, 
  MATERIAL_CATEGORIES, SUBJECTS, YEAR_LEVELS
} from "@shared/schema";
import type { MaterialCategory, Subject, YearLevel } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Materials CRUD
  getAllMaterials(): Promise<Material[]>;
  getFeaturedMaterials(limit?: number): Promise<Material[]>;
  getMaterial(id: number): Promise<Material | undefined>;
  getMaterialsByCategory(category: MaterialCategory): Promise<Material[]>;
  getMaterialsBySubject(subject: Subject): Promise<Material[]>;
  getMaterialsByYearLevel(yearLevel: YearLevel): Promise<Material[]>;
  searchMaterials(query: string): Promise<Material[]>;
  createMaterial(material: InsertMaterial): Promise<Material>;
  updateMaterialDownloads(id: number): Promise<Material | undefined>;
  getCategoryCount(category: MaterialCategory): Promise<number>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private materials: Map<number, Material>;
  private currentUserId: number;
  private currentMaterialId: number;

  constructor() {
    this.users = new Map();
    this.materials = new Map();
    this.currentUserId = 1;
    this.currentMaterialId = 1;
    this.initializeData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Materials methods
  async getAllMaterials(): Promise<Material[]> {
    return Array.from(this.materials.values());
  }

  async getFeaturedMaterials(limit = 4): Promise<Material[]> {
    return Array.from(this.materials.values())
      .filter(material => material.featured)
      .slice(0, limit);
  }

  async getMaterial(id: number): Promise<Material | undefined> {
    return this.materials.get(id);
  }

  async getMaterialsByCategory(category: MaterialCategory): Promise<Material[]> {
    return Array.from(this.materials.values())
      .filter(material => material.category === category);
  }

  async getMaterialsBySubject(subject: Subject): Promise<Material[]> {
    return Array.from(this.materials.values())
      .filter(material => material.subject === subject);
  }

  async getMaterialsByYearLevel(yearLevel: YearLevel): Promise<Material[]> {
    return Array.from(this.materials.values())
      .filter(material => material.yearLevel === yearLevel);
  }

  async searchMaterials(query: string): Promise<Material[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.materials.values())
      .filter(material => 
        material.title.toLowerCase().includes(lowerQuery) ||
        material.description.toLowerCase().includes(lowerQuery) ||
        material.author?.toLowerCase().includes(lowerQuery) ||
        material.institution?.toLowerCase().includes(lowerQuery)
      );
  }

  async createMaterial(insertMaterial: InsertMaterial): Promise<Material> {
    const id = this.currentMaterialId++;
    const now = new Date();
    
    // Extract fields from insertMaterial to create a properly typed Material object
    const { 
      title, description, category, subject, filePath, coverImage
    } = insertMaterial;
    
    // Ensure featured has a boolean value
    const featured = insertMaterial.featured === true;
    
    // Make sure optional fields are properly handled (either a valid value or null)
    const yearLevel = insertMaterial.yearLevel || null;
    const author = insertMaterial.author || null;
    const institution = insertMaterial.institution || null;
    
    // Construct the material object with explicit typing
    const material: Material = { 
      id,
      title,
      description,
      category,
      subject,
      yearLevel,
      author,
      institution,
      filePath,
      coverImage,
      downloads: 0,
      featured,
      createdAt: now
    };
    
    this.materials.set(id, material);
    return material;
  }

  async updateMaterialDownloads(id: number): Promise<Material | undefined> {
    const material = this.materials.get(id);
    if (!material) return undefined;
    
    const updatedMaterial: Material = {
      ...material,
      downloads: material.downloads + 1
    };
    this.materials.set(id, updatedMaterial);
    return updatedMaterial;
  }

  async getCategoryCount(category: MaterialCategory): Promise<number> {
    return Array.from(this.materials.values())
      .filter(material => material.category === category)
      .length;
  }

  private initializeData() {
    // Sample materials data for GHS Govt. PG College, Sujangarh
    const sampleMaterials: InsertMaterial[] = [
      {
        title: "B.Sc. 1st Year - Mechanics and Waves",
        description: "Comprehensive textbook for B.Sc. Physics first year students covering mechanics and wave motion.",
        category: "book",
        subject: "physics",
        yearLevel: "bsc_first_year",
        author: "Dr. Sharma",
        institution: "GHS Govt. PG College, Sujangarh",
        filePath: "/files/bsc-physics-1st-mechanics.pdf",
        coverImage: "https://images.unsplash.com/photo-1636466497217-06a7271ca337?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80",
        featured: true
      },
      {
        title: "Inorganic Chemistry Notes - B.Sc. 1st Year",
        description: "Detailed lecture notes on inorganic chemistry for first year B.Sc. students.",
        category: "notes",
        subject: "chemistry",
        yearLevel: "bsc_first_year",
        author: "Prof. Gupta",
        institution: "GHS Govt. PG College, Sujangarh",
        filePath: "/files/bsc-chem-1st-inorganic-notes.pdf",
        coverImage: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80",
        featured: true
      },
      {
        title: "Calculus and Differential Equations - B.Sc. 1st Year",
        description: "Essential mathematics textbook for first year B.Sc. students covering calculus and differential equations.",
        category: "book",
        subject: "mathematics",
        yearLevel: "bsc_first_year",
        author: "Dr. Verma",
        institution: "GHS Govt. PG College, Sujangarh",
        filePath: "/files/bsc-math-1st-calculus.pdf",
        coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80",
        featured: true
      },
      {
        title: "B.Sc. 2nd Year - Thermodynamics and Statistical Mechanics",
        description: "Comprehensive notes on thermodynamics and statistical mechanics for Physics students.",
        category: "notes",
        subject: "physics",
        yearLevel: "bsc_second_year",
        author: "Dr. Yadav",
        institution: "GHS Govt. PG College, Sujangarh",
        filePath: "/files/bsc-physics-2nd-thermo.pdf",
        coverImage: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80",
        featured: true
      },
      {
        title: "Organic Chemistry - B.Sc. 2nd Year",
        description: "Complete organic chemistry textbook for second year B.Sc. students.",
        category: "book",
        subject: "chemistry",
        yearLevel: "bsc_second_year",
        author: "Prof. Sharma",
        institution: "GHS Govt. PG College, Sujangarh",
        filePath: "/files/bsc-chem-2nd-organic.pdf",
        coverImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80",
        featured: false
      },
      {
        title: "Linear Algebra and Abstract Algebra - B.Sc. 2nd Year",
        description: "Comprehensive mathematics textbook covering linear algebra and abstract algebra for second year students.",
        category: "book",
        subject: "mathematics",
        yearLevel: "bsc_second_year",
        author: "Dr. Singh",
        institution: "GHS Govt. PG College, Sujangarh",
        filePath: "/files/bsc-math-2nd-linear-algebra.pdf",
        coverImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80",
        featured: false
      },
      {
        title: "B.Sc. Physics - Previous Year Papers (2023)",
        description: "Collection of previous year examination papers for B.Sc. Physics students from 2023.",
        category: "past_paper",
        subject: "physics",
        yearLevel: "bsc_third_year",
        author: "Examination Department",
        institution: "GHS Govt. PG College, Sujangarh",
        filePath: "/files/bsc-physics-past-papers-2023.pdf",
        coverImage: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80",
        featured: false
      },
      {
        title: "B.Sc. Chemistry - Previous Year Papers (2023)",
        description: "Collection of previous year examination papers for B.Sc. Chemistry students from 2023.",
        category: "past_paper",
        subject: "chemistry",
        yearLevel: "bsc_third_year",
        author: "Examination Department",
        institution: "GHS Govt. PG College, Sujangarh",
        filePath: "/files/bsc-chemistry-past-papers-2023.pdf",
        coverImage: "https://images.unsplash.com/photo-1562411052-8939603c3d46?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80",
        featured: false
      },
      {
        title: "B.Sc. Mathematics - Previous Year Papers (2023)",
        description: "Collection of previous year examination papers for B.Sc. Mathematics students from 2023.",
        category: "past_paper",
        subject: "mathematics",
        yearLevel: "bsc_third_year",
        author: "Examination Department",
        institution: "GHS Govt. PG College, Sujangarh",
        filePath: "/files/bsc-math-past-papers-2023.pdf",
        coverImage: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80",
        featured: false
      },
      {
        title: "Quantum Mechanics - B.Sc. 3rd Year",
        description: "Advanced quantum mechanics textbook for final year B.Sc. Physics students.",
        category: "book",
        subject: "physics",
        yearLevel: "bsc_third_year",
        author: "Dr. Kumar",
        institution: "GHS Govt. PG College, Sujangarh",
        filePath: "/files/bsc-physics-3rd-quantum.pdf",
        coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80",
        featured: false
      },
      {
        title: "Physical Chemistry - B.Sc. 3rd Year",
        description: "Comprehensive physical chemistry notes for final year B.Sc. students.",
        category: "notes",
        subject: "chemistry",
        yearLevel: "bsc_third_year",
        author: "Prof. Meena",
        institution: "GHS Govt. PG College, Sujangarh",
        filePath: "/files/bsc-chem-3rd-physical.pdf",
        coverImage: "https://images.unsplash.com/photo-1616593873653-e516b1391238?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80",
        featured: false
      },
      {
        title: "Real Analysis and Complex Analysis - B.Sc. 3rd Year",
        description: "Advanced mathematics textbook covering real and complex analysis for final year students.",
        category: "book",
        subject: "mathematics",
        yearLevel: "bsc_third_year",
        author: "Dr. Sharma",
        institution: "GHS Govt. PG College, Sujangarh",
        filePath: "/files/bsc-math-3rd-analysis.pdf",
        coverImage: "https://images.unsplash.com/photo-1594912772125-0f397a95f930?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80",
        featured: false
      }
    ];

    // Populate materials
    sampleMaterials.forEach(material => {
      this.createMaterial(material);
    });
  }
}

export const storage = new MemStorage();
