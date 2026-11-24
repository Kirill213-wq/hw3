import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not defined`);
  }

  return value;
}

function _positiveInt(name: string, fallback: number): number {
  const raw = process.env[name];

  if (raw === undefined || raw === "") {
    return fallback;
  }

  const value = Number(raw);

  if (value <= 0 || !Number.isSafeInteger(value)) {
    throw new Error(`${name} must be a positive integer`);
  }

  return value;
}

export const config = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 3000),
  databaseUrl: required("DATABASE_URL"),
  jwtSecret: required("JWT_SECRET"),
  cookieSecure: process.env.NODE_ENV === "production",
} as const;

export type Config = typeof config;
