import type { Repository } from "../domain/post/repository.js";
import type { NewPost } from "../domain/post/entity.js";
import type { Service } from "./post.types.js";

export function createPostService(
  postRepository: Repository,
): Service {
  return {
    async getPosts(category?: string, take?: number) {
      return await postRepository.getAll(category, take);
    },

    async getPostById(id: number) {
      return await postRepository.getById(id);
    },

    async createPost(data: NewPost) {
      return await postRepository.addPost(data);
    },
  };
}