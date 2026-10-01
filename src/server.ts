import express from "express";
import { creeatePostRepository } from "./repositories/post.js";
import { createPostService } from "./services/post.js";
import { createPostHandlers } from "./transport/handlers/post.js";
import { createPostRouter } from "./transport/routers/post.js";

export const app = express();

app.use(express.json());

const postRepository = creeatePostRepository();
const postService = createPostService(postRepository);
const postHandler = createPostHandlers(postService);
const postRouter = createPostRouter(postHandler);

app.use("/posts", postRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});