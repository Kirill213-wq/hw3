import type { Post, NewPost } from "../domain/post/entity.js";

export interface Service {
  getPosts(category?: string, take?: number): Promise<Post[]>;
  getPostById(id: number): Promise<Post | null>;
  createPost(data: NewPost): Promise<Post>;
}