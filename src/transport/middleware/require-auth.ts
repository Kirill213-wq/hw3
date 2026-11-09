import type { Request, Response, NextFunction } from "express";
import type { TokenSigner } from "../../services/user.types.js";
import { AppError } from "../../errors/apierror.js";

export function createRequireAuth(tokenSigner: TokenSigner) {
  return function requireAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies?.accessToken;

      if (!token) {
        throw new AppError(401, "Access token is required");
      }

      const userId = tokenSigner.verifyAccessToken(token);

      if (!userId) {
        throw new AppError(401, "Invalid or expired access token");
      }

      res.locals.userId = userId;
      next();
    } catch (error) {
      next(error);
    }
  };
}