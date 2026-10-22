import type { CreatePostDto } from "../dto/post.dto.js";
import type { NewPost, Post } from "../domain/post/entity.js";
import type { Repository } from "../domain/post/repository.js";
import type { db as database } from "../prisma/db.js";

export function creeatePostRepository(db: typeof database): Repository {
  return {
  async getAll(category, take, categoryId): Promise<Post[]> {
    let result = await db.orm.public.Post
      .include("category")
      .include("author", (user) => user.select("id", "email"))
      .orderBy((post) => post.id.asc())
      .all();

    if (category) {
      result = result.filter((post) => post.category.name === category);
    }

    if (categoryId !== undefined) {
      result = result.filter((post) => post.categoryId === categoryId);
    }

    if (take !== undefined) {
      result = result.slice(0, take);
    }

    return result;
  },

  async getById(id): Promise<Post | null> {
    if (!Number.isInteger(id)) return null;

    return db.orm.public.Post
      .where({ id })
      .include("category")
      .include("author", (user) => user.select("id", "email"))
      .first();
  },

  async addPost({
    title, content, authorId, categoryId,
  }: CreatePostDto): Promise<Post> {
    const created = await db.orm.public.Post.create({
      title,
      content,
      author: (user) => user.connect({ id: authorId }),
      category: (category) => category.connect({ id: categoryId }),
    });

    const post = await db.orm.public.Post
      .where({ id: created.id })
      .include("category")
      .include("author", (user) => user.select("id", "email"))
      .first();

    if (!post) throw new Error("Post not found after creation");

    return post;
  },
  getByEmail: function (email: string): unknown {
    throw new Error("Function not implemented.");
  },
 
};
}