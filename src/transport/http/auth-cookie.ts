import type { CookieOptions, Request, Response } from "express";
import { config } from "../../config.js";
import { COOKIES } from "../../constants/cookies.js"; // перевірте точний шлях і назву константи

const REFRESH_COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function getRefreshCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: config.nodeEnv === "production",
    path: "/",
    maxAge: REFRESH_COOKIE_MAX_AGE_MS,
  };
}

export function setRefreshCookie(res: Response, refreshToken: string): void {
  res.cookie(COOKIES.REFRESH_TOKEN, refreshToken, getRefreshCookieOptions());
}

export function clearRefreshCookie(res: Response): void {
  res.clearCookie(COOKIES.REFRESH_TOKEN, {
    httpOnly: true,
    sameSite: "lax",
    secure: config.nodeEnv === "production",
    path: "/",
  });
}

export function getRefreshTokenFromCookie(req: Request): string | undefined {
  return req.cookies?.[COOKIES.REFRESH_TOKEN];
}
