import type { Request, Response, NextFunction } from "express";
import type { UserService } from "../../services/user.types.js";
import type { UserDTO } from "../../dto/user.dto.js";
import { AppError } from "../../errors/apierror.js";

function credentials(body: UserDTO): UserDTO {
  if (
    !body ||
    typeof body.email !== "string" || !body.email.trim() ||
    typeof body.password !== "string" || !body.password
  ) {
    throw new AppError(422, "Email and password are required");
  }

  return body;
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

        res.cookie("accessToken", result.accessToken, {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          maxAge: 15 * 60 * 1000,
          path: "/",
        });

        res.json(result.user);
      } catch (error) {
        next(error);
      }
    },
  };
}