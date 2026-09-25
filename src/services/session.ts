import { randomUUID } from "node:crypto";
import type { Message } from "../lib/ai/index.js";
import type { Session } from "../../types/session.js";
import * as sessions from "../storage/sessions.js";

export function create(): Session {
  const sessionId = randomUUID();
  sessions.set(sessionId, []);
  return { sessionId };
}

export function get(sessionId: string): Message[] | undefined {
  return sessions.get(sessionId);
}

export function remove(sessionId: string): boolean {
  return sessions.remove(sessionId);
}

export function set(sessionId: string, messages: Message[]): void {
  sessions.set(sessionId, messages);
}
