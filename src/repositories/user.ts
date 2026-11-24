import type { Repository } from "../domain/user/repository.js";
import type { createDb } from "../prisma/db.js";

type Database = ReturnType<typeof createDb>;

export function createUserRepository(db: Database): Repository {
  return {
    async getByEmail(email) {
      return db.orm.public.User.where({ email }).first();
    },

    async getById(id) {
      return db.orm.public.User.where({ id }).select("id", "email").first();
    },

    async addUser(data) {
      const { id, email } = await db.orm.public.User.create(data);
      return { id, email };
    },
  };
}
