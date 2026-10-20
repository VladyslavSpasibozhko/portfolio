import { Redis } from "@upstash/redis";
import { config } from "../../config/index.js";
import { StorageAdapter } from "./storageAdapter.js";
import type { Storage } from "./types.js";

const redisClient = new Redis({ url: config.redisUrl, token: config.redisToken });

export const storage: Storage = new StorageAdapter(redisClient);
export type { Storage } from "./types.js";
