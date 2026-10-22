import type { PublicUser } from "../domain/user/entity.js";
import type { UserDTO } from "../dto/user.dto.js";

export interface PasswordHasher {
  hash(password: string): Promise<string>;
  verify(hash: string, password: string): Promise<boolean>;
}

export interface TokenSigner {
  signAccessToken(userId: number): string;
}

export interface UserService {
  register(data: UserDTO): Promise<PublicUser>;
  login(data: UserDTO): Promise<{
    user: PublicUser;
    accessToken: string;
  }>;
}