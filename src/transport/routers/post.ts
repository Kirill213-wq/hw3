import { Router } from 'express';
import type { createPostHandlers } from '../handlers/post.js';
type PostHandlers = ReturnType<typeof createPostHandlers>;

export const createPostRouter = (postHandler: PostHandlers) => {
  const router = Router();

router.get("/", postHandler.getPosts);
router.get("/:id", postHandler.getPostById);
router.post("/", postHandler.createPost);

  return router;
};