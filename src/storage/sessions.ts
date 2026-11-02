import { storage } from "../lib/storage/index.js";
import type { commonSchemas } from "../../shared/schemas/index.js";

const key = (id: string) => `chat:${id}`;

export async function set(history: commonSchemas.History, ttl: number): Promise<void> {
  await storage.set(key(history.session.sessionId), history, { ttl });
}

export async function get(id: string): Promise<commonSchemas.History | undefined> {
  return (await storage.get<commonSchemas.History>(key(id))) ?? undefined;
}

export async function appendMessages(id: string, messages: commonSchemas.Message[]): Promise<void> {
  await storage.append(key(id), "$.messages", messages);
}

export async function remove(id: string): Promise<boolean> {
  return storage.del(key(id));
}
