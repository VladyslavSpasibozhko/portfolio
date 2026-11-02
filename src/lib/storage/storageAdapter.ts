import type { Redis } from "@upstash/redis";
import type { Options, Storage } from "./types.js";

export class StorageAdapter implements Storage {
  constructor(private readonly client: Redis) {}

  async get<T>(key: string): Promise<T | null> {
    return this.client.json.get<T>(key);
  }

  async set<T extends Record<string, unknown>>(key: string, value: T, { ttl }: Options): Promise<void> {
    await this.client.multi().json.set(key, "$", value).expire(key, ttl).exec();
  }

  async append<T>(key: string, path: string, values: T[]): Promise<void> {
    await this.client.json.arrappend(key, path, ...values);
  }

  async del(key: string): Promise<boolean> {
    return (await this.client.del(key)) > 0;
  }
}
