export type { Post } from "../domain/post/entity.js";



export interface CreatePostDto {
  title: string;
  content: string;
  author: string;
  category: string;
}

export interface PostsQueryDto {
  category?: string;
  take?: string;
}

export interface PostParamsDto {
  id: string;
}

export interface ErrorDto {
  error: string;
}