import type { Request, Response, NextFunction } from "express";
import type { Service } from "../../services/category.types.js";
import { AppError } from "../../errors/apierror.js";

export function createCategoryHandlers(categoryService: Service) {
  return {
    async getCategories(
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        const categories = await categoryService.getCategories();
        return res.status(200).json(categories);
      } catch (error) {
        next(error);
      }
    },

    async getCategoryById(
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        const id = Number(req.params.id);

        if (!/^[1-9]\d*$/.test(req.params.id ?? "") ||
            !Number.isSafeInteger(id)) {
          throw new AppError(400, "Invalid category id");
        }

        const category = await categoryService.getCategoryById(id);

        if (!category) {
          throw new AppError(404, "Category not found");
        }

        return res.status(200).json(category);
      } catch (error) {
        next(error);
      }
    },

    async createCategory(
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        const body = req.body;

        if (
          !body ||
          typeof body !== "object" ||
          Array.isArray(body) ||
          Object.keys(body).some(key => key !== "name") ||
          typeof body.name !== "string" ||
          !body.name.trim()
        ) {
          throw new AppError(422, "Invalid category fields");
        }

        const category = await categoryService.createCategory({
          name: body.name.trim()
        });

        return res.status(201).json(category);
      } catch (error) {
        next(error);
      }
    }
  };
}