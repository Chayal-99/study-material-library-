// Import from local schema file to avoid module resolution issues
import type { MaterialCategory, Subject, YearLevel } from '@shared/schema';
import { MATERIAL_CATEGORIES, SUBJECTS, YEAR_LEVELS } from '@shared/schema';

export interface MaterialType {
  id: number;
  title: string;
  description: string;
  category: MaterialCategory;
  subject: Subject;
  yearLevel?: YearLevel;
  author?: string;
  institution?: string;
  filePath: string;
  coverImage: string;
  downloads: number;
  featured: boolean;
  createdAt: Date;
}

export interface CategoryCount {
  category: MaterialCategory;
  count: number;
}

// Re-export shared schema constants for convenience
export { 
  MATERIAL_CATEGORIES, 
  SUBJECTS, 
  YEAR_LEVELS 
} from '@shared/schema';

// Re-export type definitions
export type { MaterialCategory, Subject, YearLevel };

// Helper function to get category display name
export function getCategoryLabel(category: MaterialCategory): string {
  const labels: Record<MaterialCategory, string> = {
    'book': 'Book',
    'notes': 'Notes',
    'past_paper': 'Past Paper',
    'research': 'Research'
  };
  return labels[category] || category;
}

// Helper function to get category color
export function getCategoryColor(category: MaterialCategory): string {
  const colors: Record<MaterialCategory, string> = {
    'book': 'bg-amber-500', // secondary in design
    'notes': 'bg-blue-400',
    'past_paper': 'bg-purple-500',
    'research': 'bg-pink-500'
  };
  return colors[category] || 'bg-gray-500';
}

// Helper function to get category icon
export function getCategoryIcon(category: MaterialCategory): string {
  const icons: Record<MaterialCategory, string> = {
    'book': 'book',
    'notes': 'sticky-note',
    'past_paper': 'file-alt',
    'research': 'flask'
  };
  return icons[category] || 'document';
}

// Helper function to get subject display name for GHS Govt. PG College
export function getSubjectLabel(subject: Subject): string {
  const labels: Record<Subject, string> = {
    'mathematics': 'Mathematics',
    'physics': 'Physics',
    'chemistry': 'Chemistry'
  };
  return labels[subject] || subject;
}

// Helper function to get year level display name for B.Sc. program
export function getYearLevelLabel(yearLevel?: YearLevel): string {
  if (!yearLevel) return 'All Years';
  
  const labels: Record<YearLevel, string> = {
    'bsc_first_year': 'B.Sc. 1st Year',
    'bsc_second_year': 'B.Sc. 2nd Year',
    'bsc_third_year': 'B.Sc. 3rd Year'
  };
  return labels[yearLevel] || yearLevel;
}

// Form filter state
export interface FilterState {
  categories: MaterialCategory[];
  subject: Subject | 'all';
  yearLevels: YearLevel[];
}

export const defaultFilterState: FilterState = {
  categories: ['book', 'notes', 'past_paper', 'research'],
  subject: 'all',
  yearLevels: []
};
