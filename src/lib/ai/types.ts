export type MessageRole = "user" | "assistant";

export interface Message {
  role: MessageRole;
  content: string;
}

export interface StreamOptions {
  onmessage: (message: string) => void;
  onerror: (message: string) => void;
  onabort?: (message: string) => void;
  onend?: () => void;
  signal?: AbortSignal;
}

export interface AIAdapter {
  sendMessage(messages: Message[], system: string): Promise<string>;
  streamMessage(messages: Message[], system: string, options?: StreamOptions): Promise<string>;
}
