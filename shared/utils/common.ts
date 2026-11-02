import { commonSchemas } from "../schemas/index.js";

type BaseMessage = Pick<commonSchemas.Message, "role" | "content">;

export function createMessage(role: commonSchemas.MessageRole, content: string): BaseMessage {
  return { role, content };
}

export function createUserMessage(content: string): BaseMessage {
  return createMessage("user", content);
}

export function createAssistantMessage(content: string): BaseMessage {
  return createMessage("assistant", content);
}
