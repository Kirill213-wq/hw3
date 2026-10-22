import type { Repository } from "../domain/user/repository.js";
import type {
  PasswordHasher,
  TokenSigner,
  UserService,
} from "./user.types.js";
import { AppError } from "../errors/apierror.js";

export function createAuthService(
  repository: Repository,
  passwordHasher: PasswordHasher,
  tokenSigner: TokenSigner,
): UserService {
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
      const user = await repository.getByEmail(
        email.trim().toLowerCase(),
      );

      if (
        !user ||
        !(await passwordHasher.verify(user.password, password))
      ) {
        throw new AppError(401, "Invalid email or password");
      }

      return {
        user: { id: user.id, email: user.email },
        accessToken: tokenSigner.signAccessToken(user.id),
      };
    },
  };
}