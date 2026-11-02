import type { commonSchemas } from "../../shared/schemas/index.js";
import * as sessions from "../storage/sessions.js";
import { config } from '../config/index.js'
import { randomUUID } from "node:crypto";

export const sessionId = () => {
  return randomUUID();
}

export const sessionExpiresAt = () => {
  return Date.now() + config.sessionLifeTime;
}

export const sessionLifeTimeSeconds = () => {
  return config.sessionLifeTime / 1000;
}

export async function create(sessionId: string, expiresAt: number): Promise<commonSchemas.Session> {
  const session: commonSchemas.Session = { sessionId, expiresAt };
  await sessions.set({ session, messages: [] }, sessionLifeTimeSeconds());

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
