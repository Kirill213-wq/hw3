import { Router } from 'express';
import type { PostHandler } from '../handlers/post.js';

export const createPostRouter = (postHandler: PostHandler) => {
  const router = Router();

  router.get('/',(req, res) => postHandler.getPosts);
  router.get('/:id',(req, res) => postHandler.getPostById);
  router.post('/',(req, res) => postHandler.createPost);

  return router;
};