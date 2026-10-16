
import type { CreatePostDto } from '../dto/post.dto.js';
import type { Post } from '../domain/post/entity.js';
import type { Repository } from '../domain/post/repository.js';
import type { db as database } from '../prisma/db.js';

type Database = typeof database;

export function creeatePostRepository(db: Database): Repository {
  return {

    async getAll(category?: string, take?: number, categoryId?: number) : Promise<Post[]> {
      let result = await db.orm.public.Post
        .include("category")
        .orderBy((post) => post.id.asc())
        .all();

      // Фільтр за назвою категорії
      if (category) {
        result = result.filter(
          (post) => post.category.name === category
        );
      }

      // Фільтр за ID категорії
      if (categoryId !== undefined) {
        result = result.filter(
          (post) => post.categoryId === categoryId
        );
      }

      // Обмеження кількості дописів
      if (take !== undefined) {
        result = result.slice(0, take);
      }

      return result;
    },

    async getById(id: number) : Promise<Post | null> {
      const numericId = Number(id);

      if (!Number.isInteger(numericId)) {
        return null;
      }

      return await db.orm.public.Post
        .where({ id: numericId })
        .include("category")
        .first();
    },

    async addPost({
      title,
      content,
      author,
      categoryId
    }: CreatePostDto): Promise<Post>  {

      // Створюємо допис і прив'язуємо категорію
    const newPost = await db.orm.public.Post.create({
      title,
      content,
      author,
      category: (c) => c.connect({ id: categoryId })
  });

      // Отримуємо створений допис разом із категорією
      const post = await db.orm.public.Post
        .where({ id: newPost.id })
        .include("category")
        .first();

      if (!post) {
        throw new Error("Post not found after creation");
      }

      return post;
    }

  };
}
