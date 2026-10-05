import { randomUUID } from "node:crypto";
import type { Session } from "../../types/main/session.js";
import type { Message } from "../../types/main/message.js";
import type { History } from "../../types/history.js";
import * as sessions from "../storage/sessions.js";
import { scheduler } from "../lib/scheduler/index.js";

const SESSION_LIFETIME_MS = 24 * 60 * 60 * 1000;

export async function create(): Promise<Session> {
  const session: Session = { sessionId: randomUUID(), expiresAt: Date.now() + SESSION_LIFETIME_MS };
  await sessions.set({ session, messages: [] });

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

export async function set(sessionId: string, messages: Message[]): Promise<void> {
  const stored = await sessions.get(sessionId);
  if (!stored) {
    throw new Error("Session not found");
  }
  await sessions.set({ messages, session: stored.session });
}
