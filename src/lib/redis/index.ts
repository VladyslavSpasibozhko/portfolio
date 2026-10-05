import { Redis } from "@upstash/redis";
import { StorageAdapter } from "./storageAdapter.js";
import type { Storage } from "./types.js";

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!url) {
  throw new Error("UPSTASH_REDIS_REST_URL is not set. Copy .env.example to .env and fill it in.");
}

if (!token) {
  throw new Error("UPSTASH_REDIS_REST_TOKEN is not set. Copy .env.example to .env and fill it in.");
}

const redisClient = new Redis({ url, token });

export const storage: Storage = new StorageAdapter(redisClient);
export type { Storage } from "./types.js";
