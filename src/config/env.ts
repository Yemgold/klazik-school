





// src/config/env.ts

const requiredEnvVars = [
  "NEXT_PUBLIC_APP_NAME",
  "NEXT_PUBLIC_APP_URL",
  "NEXT_PUBLIC_API_URL",
] as const;

type RequiredEnv = (typeof requiredEnvVars)[number];

function getEnv(name: RequiredEnv): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`❌ Missing environment variable: ${name}`);
  }

  return value;
}

export const env = {
  APP_NAME: getEnv("NEXT_PUBLIC_APP_NAME"),

  APP_URL: getEnv("NEXT_PUBLIC_APP_URL"),

  API_URL: getEnv("NEXT_PUBLIC_API_URL"),

  NODE_ENV: process.env.NODE_ENV ?? "development",

  IS_DEV: process.env.NODE_ENV === "development",

  IS_PROD: process.env.NODE_ENV === "production",

  IS_TEST: process.env.NODE_ENV === "test",
} as const;