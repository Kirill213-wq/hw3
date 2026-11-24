import cookieParser from "cookie-parser";
import express from "express";
import { ROUTES } from "./constants/routes.js";
import type { AppContainer } from "./container.js";
import { errorHandler } from "./transport/middleware/errors.js";

export function createApp(container: AppContainer) {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());

  app.use(ROUTES.CATEGORIES.BASE, container.routers.categoryRouter);
  app.use(ROUTES.POSTS.BASE, container.routers.postRouter);
  app.use(ROUTES.AUTH.BASE, container.routers.authRouter);

  app.use(errorHandler);

  return app;
}
