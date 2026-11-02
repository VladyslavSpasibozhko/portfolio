import { randomUUID } from "node:crypto";
import type { commonSchemas } from "../../shared/schemas/index.js";
import * as sessions from "../storage/sessions.js";

export interface CreateSessionInput {
  now: number;
  lifeTimeMs: number;
}

export async function create({ now, lifeTimeMs }: CreateSessionInput): Promise<commonSchemas.Session> {
  const session: commonSchemas.Session = { sessionId: randomUUID(), expiresAt: now + lifeTimeMs };
  await sessions.set({ session, messages: [] }, lifeTimeMs / 1000);

  return session;
}

export async function get(sessionId: string): Promise<commonSchemas.History | undefined> {
  return await sessions.get(sessionId);
}

export async function remove(sessionId: string): Promise<boolean> {
  return sessions.remove(sessionId);
}

export async function addMessages(sessionId: string, messages: commonSchemas.Message[]): Promise<void> {
  await sessions.appendMessages(sessionId, messages);
}
