import { Temporal } from "temporal-polyfill";
import type { RefreshSessionRepository } from "../domain/refresh-session/repository.js";
import type { db as database } from "../prisma/db.js";

const toInstant = (date: Date) =>
  Temporal.Instant.fromEpochMilliseconds(date.getTime());

const toDate = (instant: { epochMilliseconds: number }) =>
  new Date(instant.epochMilliseconds);

export function createRefreshSessionRepository(
  db: typeof database,
): RefreshSessionRepository {
  return {
    async getByHash(hash) {
      const session = await db.orm.public.RefreshSession
        .where({ tokenHash: hash })
        .first();

      if (!session) return null;

      return {
        id: session.id,
        userId: session.userId,
        tokenHash: session.tokenHash,
        expiresAt: toDate(session.expiresAt),
        createdAt: toDate(session.createdAt),
      };
    },

    async create(data) {
      await db.orm.public.RefreshSession.create({
        userId: data.userId,
        tokenHash: data.tokenHash,
        expiresAt: toInstant(data.expiresAt),
      });
    },

    async rotate(oldHash, newHash, expiresAt) {
      const updated = await db.orm.public.RefreshSession
        .where({ tokenHash: oldHash })
        .update({ tokenHash: newHash, expiresAt: toInstant(expiresAt) });

      return updated !== null;
    },

    async deleteByHash(hash) {
      await db.orm.public.RefreshSession.where({ tokenHash: hash }).delete();
    },
  };
}