import { Router } from "express";
import type { RequestHandler } from "express";
import type { createPostHandlers } from "../handlers/post.js";

type PostHandlers = ReturnType<typeof createPostHandlers>;

export const createPostRouter = (
  postHandler: PostHandlers,
  requireAuth: RequestHandler,
) => {
  const router = Router();

  router.get("/", postHandler.getPosts);
  router.get("/:id", postHandler.getPostById);
  router.post("/", requireAuth, postHandler.createPost);

  return router;
};