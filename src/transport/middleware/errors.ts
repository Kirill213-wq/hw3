import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/apierror.js";



export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.status).json({
      error: error.message
    });
  }

  const code =
    typeof error === "object" && error !== null && "code" in error
      ? error.code
      : undefined;

  if (code === "23505" || code === "P2002") {
    return res.status(409).json({
      error: "Category already exists"
    });
  }

  console.error(error);

  return res.status(500).json({
    error: "Internal Server Error"
  });
}