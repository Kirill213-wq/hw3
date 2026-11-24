import type { Request, Response } from "express";
import type { CreatePostDto } from "../../dto/post.dto.js";
import type { Service } from "../../services/post.types.js";

//fsf
export function createPostHandlers(postService: Service) {
  return {
    async getPosts(_req: Request, res: Response) {
      try {
        const posts = await postService.getPosts();
        return res.status(200).json(posts);
      } catch (_error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    },
    async getPostById(req: Request, res: Response) {
      try {
        const { id } = req.params;
        const post = await postService.getPostById(Number(id));

        if (!post) {
          return res.status(404).json({ error: "Post not found" });
        }

        return res.status(200).json(post);
      } catch (_error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    },

    async createPost(
      req: Request<Record<string, never>, Record<string, never>, CreatePostDto>,
      res: Response,
    ) {
      try {
        const { title, content, categoryId } = req.body ?? {};
        const authorId = res.locals.userId;

        if (typeof authorId !== "number") {
          return res.status(401).json({ error: "Unauthorized" });
        }

        if (
          typeof title !== "string" ||
          !title.trim() ||
          typeof content !== "string" ||
          !content.trim() ||
          !Number.isSafeInteger(categoryId) ||
          categoryId <= 0
        ) {
          return res.status(422).json({ error: "Invalid post data" });
        }

        const newPost = await postService.createPost({
          title,
          content,
          authorId,
          categoryId,
        });

        return res.status(201).json(newPost);
      } catch (_error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    },
  };
}
