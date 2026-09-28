import type { Redis } from "@upstash/redis";
import type { Storage } from "./types.js";

export class StorageAdapter implements Storage {
  constructor(private readonly client: Redis) {}

  async get<T>(key: string): Promise<T | null> {
    return this.client.get<T>(key);
  }

  async set<T>(key: string, value: T): Promise<void> {
    await this.client.set(key, value);
  }

  async del(key: string): Promise<boolean> {
    return (await this.client.del(key)) > 0;
  }
}
