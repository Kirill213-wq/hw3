import type { Category, NewCategory } from "../domain/category/entity.js";

export interface Service {
    getCategories(take?: number): Promise<Category[]>;
    getCategoryById(id: number): Promise<Category | null>;
    createCategory(data: NewCategory): Promise<Category>;
    } 