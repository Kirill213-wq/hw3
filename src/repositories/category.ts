import type { Category, NewCategory } from "../domain/category/entity.js";
import type { Repository as CategoryRepository } from "../domain/category/repository.js";
import type { CreateCategoryDto } from "../dto/category.dto.js";
import {db } from "../prisma/db.js";

type Database = typeof db;

export function createCategoryRepository(db: Database): CategoryRepository {
  return {
    async getAll() {
        return await db.orm.public.Category
            .orderBy((category: { id: { asc: () => any; }; }) => category.id.asc())
            .all();
    },

    async getById(id: number) {
        return await db.orm.public.Category
            .where({ id })
            .first();
    },

    async getByName(name: string) {
        return await db.orm.public.Category
            .where({ name })
            .first();
    },

    async addCategory({ name }: CreateCategoryDto) {
        return await db.orm.public.Category.create({
            name
        });
    },

    };
}