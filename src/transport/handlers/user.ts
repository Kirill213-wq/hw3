import type { Request, Response, NextFunction } from "express";
import type { UserService } from "../../services/user.types.js";
import type { UserDTO } from "../../dto/user.dto.js";
import { AppError } from "../../errors/apierror.js";

function credentials(body: UserDTO): UserDTO {
  if (
    !body ||
    typeof body.email !== "string" ||
    !body.email.trim() ||
    typeof body.password !== "string" ||
    !body.password
  ) {
    throw new AppError(422, "Email and password are required");
  }

  return body;
}

function setAuthCookies(
  res: Response,
  accessToken: string,
  refreshToken: string,
) {
  const secure = process.env.NODE_ENV === "production";

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    maxAge: 15 * 60 * 1000,
    path: "/",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });
}

export function createAuthHandlers(userService: UserService) {
  return {
    async register(req: Request, res: Response, next: NextFunction) {
      try {
        const user = await userService.register(credentials(req.body));
        res.status(201).json(user);
      } catch (error) {
        next(error);
      }
    },

    async login(req: Request, res: Response, next: NextFunction) {
      try {
        const result = await userService.login(credentials(req.body));

        setAuthCookies(
          res,
          result.accessToken,
          result.refreshToken,
        );

        res.json(result.user);
      } catch (error) {
        next(error);
      }
    },

    async refresh(req: Request, res: Response, next: NextFunction) {
      try {
        const token = req.cookies?.refreshToken;

        if (!token) {
          throw new AppError(401, "Refresh token is required");
        }

        const tokens = await userService.refresh(token);

        setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

        res.json({ message: "Tokens refreshed" });
      } catch (error) {
        next(error);
      }
    },

    async me(req: Request, res: Response, next: NextFunction) {
      try {
        const user = await userService.me(res.locals.userId);
        res.json(user);
      } catch (error) {
        next(error);
      }
    },
  };
}