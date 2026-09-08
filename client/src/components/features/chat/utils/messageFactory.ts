import type { WsMessage } from "@types";

export function messageFactory(content: string): WsMessage {
  return {
    role: "user",
    content,
  };
}
