export type { Category } from "../domain/category/entity.js";


export interface CreateCategoryDto {
  name: string;
}   

export interface CategoriesQueryDto {
  take?: string;
  skip?: string;    
}

export interface CategoryParamsDto {
  id: string;
}

export interface ErrorDto {
  error: string;
}