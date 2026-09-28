

import express from 'express';
import { PostRepository } from './repositories/post.js';
import { PostService } from './services/post.js';
import { PostHandler } from './transport/handlers/post.js';
import { createPostRouter } from './transport/routers/post.js';

const app = express();
const PORT = 3000;

app.use(express.json());


const postRepository = new PostRepository();
const postService = new PostService(postRepository);
const postHandler = new PostHandler(postService);
const postRouter = createPostRouter(postHandler);

app.use('/posts', postRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});