import type { Repository as CategoryRepository } from "../domain/category/repository.js";
import type { CreateCategoryDto } from "../dto/category.dto.js";
import type { createDb } from "../prisma/db.js";

type Database = ReturnType<typeof createDb>;

export function createCategoryRepository(db: Database): CategoryRepository {
  return {
    async getAll() {
      return await db.orm.public.Category.orderBy((category) =>
        category.id.asc(),
      ).all();
    },

    async getById(id: number) {
      return await db.orm.public.Category.where({ id }).first();
    },

    async getByName(name: string) {
      return await db.orm.public.Category.where({ name }).first();
    },

    async addCategory({ name }: CreateCategoryDto) {
      return await db.orm.public.Category.create({
        name,
      });
    },
  };
}
