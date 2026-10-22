import type { Post, NewPost } from "./entity.js";

export interface Repository {
  [x: string]: any;
  getByEmail(email: string): unknown;
  getAll(
    category?: string,
    take?: number,
    categoryId?: number
  ): Promise<Post[]>;

  getById(id: number): Promise<Post | null>;

  addPost(data: NewPost): Promise<Post>;
}