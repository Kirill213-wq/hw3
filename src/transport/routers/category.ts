

import { Router } from "express";
import type { createCategoryHandlers } from "../handlers/category.js";

type CategoryHandlers = ReturnType<typeof createCategoryHandlers>;

export function createCategoryRouter(categoryHandler: CategoryHandlers)  {
  const router = Router();

  router.get("/", categoryHandler.getCategories);
  router.get("/:id", categoryHandler.getCategoryById);
  router.post("/", categoryHandler.createCategory);

  return router;
}