import type { FetchConfig } from "@lib/request";
import type { StreamConfig } from "@lib/sse";
import type { ChatRequest } from "@global-types/api";

export function createSession(): FetchConfig {
  return { path: "/chat/create", method: "POST" };
}

export function deleteSession(sessionId: string): FetchConfig {
  return { path: `/chat/${sessionId}`, method: "DELETE" };
}

export function sendMessage(request: ChatRequest): StreamConfig<ChatRequest> {
  return { path: "/chat", method: "POST", body: request };
}