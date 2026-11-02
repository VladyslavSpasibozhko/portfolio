import type { messages } from "@shared/errors";

export type StreamBody = FormData | object;

export interface StreamConfig<B extends StreamBody = StreamBody> {
  path: string;
  method: "GET" | "POST";
  headers?: Record<string, string>;
  body?: B;
}


export interface StreamOptions {
  signal?: AbortSignal;
  onError(message: messages.ErrorMessage): void;
  onFrame(frame: string): void;
}
