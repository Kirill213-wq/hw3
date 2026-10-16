
import type { Category, NewCategory } from "./entity.js";

export interface Repository {
  [x: string]: any;
 
  
  getAll(category?: string, take?: number): Promise<Category[]> | Category[];
  getById(id: number): Promise<Category | null> | Category | null;
  getByName(name: string): Promise<Category | null> | Category | null;
  addCategory(category: NewCategory): Promise<Category> | Category;
}