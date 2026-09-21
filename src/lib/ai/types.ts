export type MessageRole = "user" | "assistant";

export interface Message {
  role: MessageRole;
  content: string;
}

export interface StreamOptions {
  onmessage?: (message: string) => void;
  onerror?: (error: string) => void;
  onabort?: () => void;
  onend?: () => void;
  signal?: AbortSignal;
}

export interface AIAdapter {
  sendMessage(messages: Message[], system: string): Promise<string>;
  streamMessage(messages: Message[], system: string, options?: StreamOptions): Promise<void>;
}
