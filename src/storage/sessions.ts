import type { Message } from "../lib/ai/index.js";

const sessions = new Map<string, Message[]>();

export function set(id: string, messages: Message[]): void {
  sessions.set(id, messages);
}

export function get(id: string): Message[] | undefined {
  return sessions.get(id);
}

export function remove(id: string): boolean {
  return sessions.delete(id);
}
