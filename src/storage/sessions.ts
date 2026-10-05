import { storage } from "../lib/redis/index.js";
import type { History } from "../../types/history.js";

const key = (id: string) => `session:${id}`;

export async function set(history: History ): Promise<void> {
  await storage.set(key(history.session.sessionId), history);
}

export async function get(id: string): Promise<History | undefined> {
  return (await storage.get<History>(key(id))) ?? undefined;
}

export async function remove(id: string): Promise<boolean> {
  return storage.del(key(id));
}
