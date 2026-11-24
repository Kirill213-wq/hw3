import type { RefreshRepository } from "../domain/refresh-session/repository.js";
import type { Repository } from "../domain/user/repository.js";
import { AppError } from "../errors/apierror.js";
import type {
  PasswordHasher,
  RefreshTokenHasher,
  TokenSigner,
  UserService,
} from "./user.types.js";

export interface AuthServiceDeps {
  repository: Repository;
  passwordHasher: PasswordHasher;
  tokenSigner: TokenSigner;
  tokens: RefreshTokenHasher;
  sessions: RefreshRepository;
}

export function createAuthService(deps: AuthServiceDeps): UserService {
  const { repository, passwordHasher, tokenSigner, tokens, sessions } = deps;
  const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000;

  return {
    async register({ email, password }) {
      email = email.trim().toLowerCase();

      if (await repository.getByEmail(email)) {
        throw new AppError(409, "Email already exists");
      }

      return repository.addUser({
        email,
        password: await passwordHasher.hash(password),
      });
    },

    async login({ email, password }) {
      const user = await repository.getByEmail(email.trim().toLowerCase());

      if (!user || !(await passwordHasher.verify(user.password, password))) {
        throw new AppError(401, "Invalid email or password");
      }

      const refreshToken = tokenSigner.signRefreshToken(user.id);

      await sessions.create({
        userId: user.id,
        tokenHash: tokens.hash(refreshToken),
        expiresAt: new Date(Date.now() + REFRESH_TTL_MS),
      });

      return {
        user: { id: user.id, email: user.email },
        accessToken: tokenSigner.signAccessToken(user.id),
        refreshToken,
      };
    },

    async refresh(token) {
      const userId = tokenSigner.verifyRefreshToken(token);

      if (!userId) {
        throw new AppError(401, "Invalid refresh token");
      }

      const oldHash = tokens.hash(token);
      const session = await sessions.getByHash(oldHash);

      if (
        !session ||
        session.userId !== userId ||
        session.expiresAt <= new Date()
      ) {
        throw new AppError(401, "Invalid refresh token");
      }

      const user = await repository.getById(userId);

      if (!user) {
        throw new AppError(401, "User not found");
      }

      const newRefreshToken = tokenSigner.signRefreshToken(userId);

      const rotated = await sessions.rotate(
        oldHash,
        tokens.hash(newRefreshToken),
        new Date(Date.now() + REFRESH_TTL_MS),
      );

      if (!rotated) {
        throw new AppError(401, "Invalid refresh token");
      }

      return {
        accessToken: tokenSigner.signAccessToken(userId),
        refreshToken: newRefreshToken,
      };
    },

    async logout(token) {
      if (!token) return;

      await sessions.deleteByHash(tokens.hash(token));
    },

    async me(userId) {
      const user = await repository.getById(userId);

      if (!user) {
        throw new AppError(404, "User not found");
      }

      return user;
    },
  };
}
