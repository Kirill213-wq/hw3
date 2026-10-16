import type { Repository } from "../domain/category/repository.js";
import type { NewCategory } from "../domain/category/entity.js";
import type { Service } from "./category.types.js";
import { AppError } from "../errors/apierror.js";

export function createCategoryService(categoryRepository: Repository): Service {
    return {
        async getCategories(take?: number) {
            return categoryRepository.getAll();
        },
        async getCategoryById(id) {
            return await categoryRepository.getById(id);
        },
        async createCategory(data: NewCategory) {
            const existingCategory = await await categoryRepository.getByName(data.name);
            if (existingCategory) {
                throw new AppError(400, "Category with this name already exists");
            }
            return await categoryRepository.addCategory(data);
        },
    };
}