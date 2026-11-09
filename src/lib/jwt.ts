import jwt, { type JwtPayload } from "jsonwebtoken";
import type { TokenSigner } from "../services/user.types.js";

export function createTokenSigner(secret: string): TokenSigner {
  if (!secret) throw new Error("JWT_SECRET is required");

  function signToken(userId: number, type: "access" | "refresh") {
    return jwt.sign({ type }, secret, {
      subject: String(userId),
      expiresIn: type === "access" ? "15m" : "7d",
    });
  }

  function verifyToken(
    token: string,
    type: "access" | "refresh",
  ): number | null {
    try {
      const payload = jwt.verify(token, secret) as JwtPayload;

      const userId = Number(payload.sub);

      if (
        payload.type !== type ||
        !Number.isSafeInteger(userId) ||
        userId <= 0
      ) {
        return null;
      }

      return userId;
    } catch {
      return null;
    }
  }

  return {
    signAccessToken: (userId) => signToken(userId, "access"),
    signRefreshToken: (userId) => signToken(userId, "refresh"),
    verifyAccessToken: (token) => verifyToken(token, "access"),
    verifyRefreshToken: (token) => verifyToken(token, "refresh"),
  };
}