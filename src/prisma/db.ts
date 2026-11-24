import "temporal-polyfill/global";
import postgres from "@prisma/orm-postgres/runtime";
import { config } from "../config.js";
import type { Contract } from "./contract.d";
import contractJson from "./contract.json" with { type: "json" };

export function createDb(databaseUrl: string = config.databaseUrl) {
  return postgres<Contract>({
    contractJson,
    url: databaseUrl,
  });
}

export type DbClient = ReturnType<typeof createDb>;
