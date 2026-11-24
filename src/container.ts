import { config } from "./config.js";
import { createRefreshTokenHasher, createTokenSigner } from "./lib/jwt.js";
import { createPasswordHasher } from "./lib/password.js";
import { createDb } from "./prisma/db.js";
import { createCategoryRepository } from "./repositories/category.js";
import { creeatePostRepository } from "./repositories/post.js";
import { createRefreshSessionRepository } from "./repositories/refresh-session.js";
import { createUserRepository } from "./repositories/user.js";
import { createCategoryService } from "./services/category.js";
import { createPostService } from "./services/post.js";
import { createAuthService } from "./services/user.js";
import { createCategoryHandlers } from "./transport/handlers/category.js";
import { createPostHandlers } from "./transport/handlers/post.js";
import { createAuthHandlers } from "./transport/handlers/user.js";
import { createRequireAuth } from "./transport/middleware/require-auth.js";
import { createAuthRouter } from "./transport/routers/auth.js";
import { createCategoryRouter } from "./transport/routers/category.js";
import { createPostRouter } from "./transport/routers/post.js";

export function createContainer() {
  const db = createDb(config.databaseUrl);
  const passwordHasher = createPasswordHasher();
  const tokenSigner = createTokenSigner(config.jwtSecret);
  const refreshTokenHasher = createRefreshTokenHasher();

  const categoryRepository = createCategoryRepository(db);
  const categoryService = createCategoryService(categoryRepository);
  const categoryHandler = createCategoryHandlers(categoryService);
  const categoryRouter = createCategoryRouter(categoryHandler);

  const postRepository = creeatePostRepository(db);
  const postService = createPostService(postRepository, categoryRepository);
  const postHandler = createPostHandlers(postService);

  const userRepository = createUserRepository(db);
  const refreshSessionRepository = createRefreshSessionRepository(db);
  const userService = createAuthService({
    repository: userRepository,
    passwordHasher,
    tokenSigner,
    tokens: refreshTokenHasher,
    sessions: refreshSessionRepository,
  });

  const requireAuth = createRequireAuth(tokenSigner);

  const authHandler = createAuthHandlers(userService);
  const authRouter = createAuthRouter(authHandler, requireAuth);
  const postRouter = createPostRouter(postHandler, requireAuth);

  return {
    db,
    routers: {
      authRouter,
      categoryRouter,
      postRouter,
    },
  };
}

export type AppContainer = ReturnType<typeof createContainer>;
