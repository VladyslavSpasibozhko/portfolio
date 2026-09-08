import type { WsMessageRole, WsMessage } from "@types";

export function messageFactory(
  content: string,
  role: WsMessageRole = "user",
): WsMessage {
  return {
    role,
    content,
  };
}
