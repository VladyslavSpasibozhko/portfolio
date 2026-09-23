import type { Message, MessageRole } from "@types";
// TODO: remove it and reuse from global util.
export function messageFactory(
  sessionId: string,
  content: string,
  role: MessageRole = "user",
): Message {
  return {
    sessionId,
    role,
    content,
  };
}