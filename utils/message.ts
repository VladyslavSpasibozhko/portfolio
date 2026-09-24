import type { Message, MessageRole } from "../types/message.js";

type BaseMessage = Pick<Message, "role" | "content">;

export function createMessage(role: MessageRole, content: string): BaseMessage {
  return { role, content };
}

export function createUserMessage(content: string): BaseMessage {
  return createMessage("user", content);
}

export function createAssistantMessage(content: string): BaseMessage {
  return createMessage("assistant", content);
}
