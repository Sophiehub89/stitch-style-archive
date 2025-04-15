
export interface Tutorial {
  id: string;
  slug: string;
  title: string;
  description: string;
  materials: string[];
  instructions: string[];
  category: string;
  tags: string[];
  image: string;
  createdAt: string;
}

export type Category = 
  | 'Amigurumi' 
  | 'Apparel' 
  | 'Bags' 
  | 'Blankets' 
  | 'Coasters' 
  | 'Decor' 
  | 'Hats' 
  | 'Scarves' 
  | 'Toys' 
  | 'Other';

export type Tag =
  | 'Beginner'
  | 'Intermediate'
  | 'Advanced'
  | 'Quick'
  | 'Home'
  | 'Gift'
  | 'Seasonal'
  | 'Colorful'
  | 'Monochrome'
  | 'Eco-friendly';
