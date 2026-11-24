import type { RefreshSession } from "./entity.js";

export type NewRefreshSession = Pick<
  RefreshSession,
  "userId" | "tokenHash" | "expiresAt"
>;

export interface RefreshSessionRepository {
  getByHash(hash: string): Promise<RefreshSession | null>;
  create(data: NewRefreshSession): Promise<void>;
  rotate(oldHash: string, newHash: string, expiresAt: Date): Promise<boolean>;
  deleteByHash(hash: string): Promise<void>;
}

export type RefreshRepository = RefreshSessionRepository;
