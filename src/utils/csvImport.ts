
import { supabase } from "@/integrations/supabase/client";
import Papa from "papaparse";
import { Category, Tag } from "@/types";

interface CsvTutorial {
  id: string;
  title: string;
  description: string;
  tags: string;
  category: string;
  difficulty: string;
  instructions: string;
  materials: string;
  image?: string;
}

export const parseCsvFile = (file: File): Promise<CsvTutorial[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(new Error(`CSV parsing error: ${results.errors[0].message}`));
          return;
        }
        resolve(results.data as CsvTutorial[]);
      },
      error: (error) => {
        reject(new Error(`CSV parsing error: ${error.message}`));
      }
    });
  });
};

export const validateCsvData = (data: CsvTutorial[]): string[] => {
  const errors: string[] = [];
  const requiredFields = ['title', 'description', 'category', 'instructions', 'materials'];
  
  data.forEach((row, index) => {
    requiredFields.forEach(field => {
      if (!row[field as keyof CsvTutorial]) {
        errors.push(`Row ${index + 1}: Missing required field '${field}'`);
      }
    });

    // Validate category
    if (row.category && !isValidCategory(row.category)) {
      errors.push(`Row ${index + 1}: Invalid category '${row.category}'`);
    }
  });

  return errors;
};

const isValidCategory = (category: string): boolean => {
  const validCategories: Category[] = [
    'Amigurumi', 'Apparel', 'Bags', 'Blankets', 'Coasters', 
    'Decor', 'Hats', 'Scarves', 'Toys', 'Other'
  ];
  return validCategories.includes(category as Category);
};

export const transformCsvToTutorials = (data: CsvTutorial[]) => {
  return data.map(row => {
    // Generate a slug from the title
    const slug = row.title
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
    
    // Split comma-separated tags and instructions
    const tags = row.tags ? row.tags.split(',').map(tag => tag.trim()) : [];
    const instructions = row.instructions ? row.instructions.split('|').map(i => i.trim()) : [];
    const materials = row.materials ? row.materials.split('|').map(m => m.trim()) : [];
    
    // Use placeholder image if none provided
    const image = row.image || '/placeholder.svg';
    
    // Create a tutorial object
    return {
      slug,
      title: row.title,
      description: row.description,
      category: row.category as Category,
      tags,
      instructions,
      materials,
      image,
      createdAt: new Date().toISOString()
    };
  });
};

export const uploadTutorialsToSupabase = async (tutorials: any[]) => {
  const { data, error } = await supabase
    .from('tutorials')
    .insert(tutorials)
    .select();
  
  if (error) {
    throw new Error(`Failed to upload tutorials: ${error.message}`);
  }
  
  return data;
};
