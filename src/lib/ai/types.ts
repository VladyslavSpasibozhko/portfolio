export type MessageRole = "user" | "assistant";

export interface Message {
  role: MessageRole;
  content: string;
}

export interface AIAdapter {
  sendMessage(messages: Message[], system: string): Promise<string>;
}
