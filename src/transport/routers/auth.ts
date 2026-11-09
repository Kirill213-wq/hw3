import { Router } from "express";
import type { RequestHandler } from "express";
import type { createAuthHandlers } from "../handlers/user.js";

export function createAuthRouter(
  handlers: ReturnType<typeof createAuthHandlers>,
  requireAuth: RequestHandler,
) {
  const router = Router();

  router.post("/register", handlers.register);
  router.post("/login", handlers.login);
  router.post("/refresh", handlers.refresh);
  router.get("/me", requireAuth, handlers.me);

  return router;
}