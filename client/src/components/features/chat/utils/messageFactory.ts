import type { WsMessage } from "@types";

export function messageFactory(
  content: string,
  role: WsMessage["role"] = "user",
): WsMessage {
  return {
    role,
    content,
  };
}
