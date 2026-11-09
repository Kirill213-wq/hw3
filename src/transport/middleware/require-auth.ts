import type { Request, Response, NextFunction } from "express";
import type { TokenSigner } from "../../services/user.types.js";

export function createRequireAuth(tokenSigner: TokenSigner) {
  return function requireAuth(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = tokenSigner.verifyAccessToken(token);

    if (!userId) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    res.locals.userId = userId;
    next();
  };
}