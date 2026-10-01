import type { Post, NewPost } from "./entity.js";

export interface Repository {
  getAll(category?: string, take?: number): Promise<Post[]> | Post[];
  getById(id: number): Promise<Post | null> | Post | null;
  addPost(data: NewPost): Promise<Post> | Post;
  
}