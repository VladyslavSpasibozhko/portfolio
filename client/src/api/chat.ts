import type { FetchConfig } from "@lib/request";
import type { StreamConfig } from "@lib/sse";
import type { Message } from "@types";

export function createSession(): FetchConfig {
  return { path: "/chat/create", method: "POST" };
}

export function deleteSession(sessionId: string): FetchConfig {
  return { path: `/chat/${sessionId}`, method: "DELETE" };
}

export function sendMessage(message: Message): StreamConfig<Message> {
  return { path: "/chat", method: "POST", body: message };
}