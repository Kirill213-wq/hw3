import jwt from "jsonwebtoken";
import type { TokenSigner } from "../services/user.types.js";

export function createTokenSigner(secret: string): TokenSigner {
  if (!secret) throw new Error("JWT_SECRET is required");

  return {
    signAccessToken(userId: number) {
      return jwt.sign({}, secret, {
        subject: String(userId),
        expiresIn: "15m",
      });
    },

    signRefreshToken(userId: number) {
      return jwt.sign({}, secret, {
        subject: String(userId),
        expiresIn: "7d",
      });
    },

    verifyAccessToken(token: string) {
      return verifyToken(token, secret);
    },

    verifyRefreshToken(token: string) {
      return verifyToken(token, secret);
    },
  };
}

function verifyToken(token: string, secret: string): number | null {
  try {
    const payload = jwt.verify(token, secret);

    if (typeof payload === "string" || !payload.sub) return null;

    const userId = Number(payload.sub);
    return Number.isSafeInteger(userId) && userId > 0 ? userId : null;
  } catch {
    return null;
  }
}