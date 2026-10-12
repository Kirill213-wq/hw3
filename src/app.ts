import express from "express";
import { creeatePostRepository } from "./repositories/post.js";
import { createPostService } from "./services/post.js";
import { createPostHandlers } from "./transport/handlers/post.js";
import { createPostRouter } from "./transport/routers/post.js";
import { db } from "./prisma/db.js";

export const app = express();

app.use(express.json());

const postRepository = creeatePostRepository(db);
const postService = createPostService(postRepository);
const postHandler = createPostHandlers(postService);
const postRouter = createPostRouter(postHandler);

app.use("/posts", postRouter);

