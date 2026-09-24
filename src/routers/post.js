import { Router } from 'express';

export const createPostRouter = (postHandler) => {
  const router = Router();

  router.get('/', postHandler.getPosts);
  router.get('/:id', postHandler.getPostById);
  router.post('/', postHandler.createPost);

  return router;
};