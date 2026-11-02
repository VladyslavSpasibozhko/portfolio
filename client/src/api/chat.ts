import type { FetchConfig } from "@lib/request";
import type { StreamConfig } from "@lib/sse";
import type { commonSchemas } from "@shared/schemas";

export function createSession(): FetchConfig {
  return { path: "/chat/create", method: "POST" };
}

export function deleteSession(sessionId: string): FetchConfig {
  return { path: `/chat/${sessionId}`, method: "DELETE" };
}

export function getChatMessages(sessionId: string): FetchConfig {
  return { path: `/chat/${sessionId}/messages`, method: "GET" };
}

export function sendMessage(request: commonSchemas.CreateMessage): StreamConfig<commonSchemas.CreateMessage> {
  return { path: "/chat", method: "POST", body: request };
}