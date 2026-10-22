import jwt from "jsonwebtoken";
import type { TokenSigner } from "../services/user.types.js";

export function createTokenSigner(secret: string): TokenSigner {
  if (!secret) throw new Error("JWT_SECRET is required");

  return {
    signAccessToken(userId: any) {
      return jwt.sign({}, secret, {
        subject: String(userId),
        expiresIn: "15m",
      });
    },
  };
}