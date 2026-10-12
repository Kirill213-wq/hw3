import type {CreatePostDto} from '../dto/post.dto.js';
import type { Post } from '../domain/post/entity.js';
import type { Repository } from '../domain/post/repository.js';
import type { db as database } from '../prisma/db.js';




type Database = typeof database;



export function creeatePostRepository(db: Database): Repository{
  return{

  
  async getAll(category?: string, take?: number) {
    let result = await db.orm.public.Post.orderBy((post) => post.id.asc()).all();


    if (category) {
      result = result.filter((post) => post.category === category);
    }

    if (take !== undefined) {
      const limit = Number(take);
      result = result.slice(0, limit);
    }

    return result;
  },

 async getById(id: number) {
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    return null;
  }

  return await db.orm.public.Post
    .where({ id: numericId })
    .first();
},

async addPost({
  title,
  content,
  author,
  category
}: CreatePostDto): Promise<Post> {
  const newPost: Post = await db.orm.public.Post.create({
    title,
    content,
    author,
    category
  });

       return newPost;
    }
  };
}
