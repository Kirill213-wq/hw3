import "dotenv/config";
import express from "express";

import { creeatePostRepository } from "./repositories/post.js";
import { createPostService } from "./services/post.js";
import { createPostHandlers } from "./transport/handlers/post.js";
import { createPostRouter } from "./transport/routers/post.js";

import { createCategoryRepository } from "./repositories/category.js";
import { createCategoryService } from "./services/category.js";
import { createCategoryHandlers } from "./transport/handlers/category.js";
import { createCategoryRouter } from "./transport/routers/category.js";

import { createUserRepository } from "./repositories/user.js";
import { createAuthService } from "./services/user.js";
import { hashPassword, verifyPassword } from "./lib/password.js";
import { createTokenSigner } from "./lib/jwt.js";
import { createAuthHandlers } from "./transport/handlers/user.js";
import { createAuthRouter } from "./transport/routers/auth.js";

import { errorHandler } from "./transport/middleware/errors.js";
import { db } from "./prisma/db.js";

export const app = express();

app.use(express.json());


const categoryRepository = createCategoryRepository(db);
const categoryService = createCategoryService(categoryRepository);
const categoryHandler = createCategoryHandlers(categoryService);
const categoryRouter = createCategoryRouter(categoryHandler);


const postRepository = creeatePostRepository(db);
const postService = createPostService(postRepository, categoryRepository);
const postHandler = createPostHandlers(postService);
const postRouter = createPostRouter(postHandler);

const userRepository = createUserRepository(db);
const userService = createAuthService(
  userRepository,
  { hash: hashPassword, verify: verifyPassword },
  createTokenSigner(process.env.JWT_SECRET ?? ""),
);
const authHandler = createAuthHandlers(userService);
const authRouter = createAuthRouter(authHandler);

app.use("/categories", categoryRouter);
app.use("/posts", postRouter);
app.use("/auth", authRouter);


app.use(errorHandler);


