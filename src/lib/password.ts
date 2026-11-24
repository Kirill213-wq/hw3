import argon2 from "argon2";

export function createPasswordHasher() {
  return {
    hash(password: string): Promise<string> {
      return argon2.hash(password);
    },
    verify(hash: string, password: string): Promise<boolean> {
      return argon2.verify(hash, password);
    },
  };
}

export type PasswordHasher = ReturnType<typeof createPasswordHasher>;
