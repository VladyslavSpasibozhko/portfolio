import { randomUUID } from "node:crypto";
import type { Session } from "../../types/main/session.js";
import type { Message } from "../../types/main/message.js";
import type { History } from "../../types/history.js";
import * as sessions from "../storage/sessions.js";
import { scheduler } from "../lib/scheduler/index.js";
import { config } from "../config/index.js";

export async function create(): Promise<Session> {
  const session: Session = { sessionId: randomUUID(), expiresAt: Date.now() + config.sessionLifeTime };
  await sessions.set({ session, messages: [] }, config.sessionLifeTime / 1000);

  return session;
}

export async function setSessionCleanup(path: string, session: Session): Promise<void> {
  try {
    const EXPIRES_AFTER = Math.max(0, Math.round((session.expiresAt - Date.now()) / 1000))
    await scheduler.schedule({ path, delaySeconds: EXPIRES_AFTER });
  } catch (e) {
    await sessions.remove(session.sessionId);
    throw e;
  }
}

export async function verifyCleanup(path: string, signature: string, body: string): Promise<boolean> {
  return scheduler.verify({ signature, body, path });
}

export async function get(sessionId: string): Promise<History | undefined> {
  return await sessions.get(sessionId);
}

export async function remove(sessionId: string): Promise<boolean> {
  return sessions.remove(sessionId);
}

export async function addMessages(sessionId: string, messages: Message[]): Promise<void> {
  await sessions.appendMessages(sessionId, messages);
}
