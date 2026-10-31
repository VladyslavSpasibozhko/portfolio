import { storage } from "../lib/redis/index.js";
import type { History } from "../../types/history.js";
import type { Message } from "../../types/main/message.js";

const key = (id: string) => `chat:${id}`;

export async function set(history: History, ttl: number): Promise<void> {
  await storage.set(key(history.session.sessionId), history, { ttl });
}

export async function get(id: string): Promise<History | undefined> {
  return (await storage.get<History>(key(id))) ?? undefined;
}

export async function appendMessages(id: string, messages: Message[]): Promise<void> {
  await storage.append(key(id), "$.messages", messages);
}

export async function remove(id: string): Promise<boolean> {
  return storage.del(key(id));
}
