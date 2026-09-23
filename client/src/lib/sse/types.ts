export type StreamBody = FormData | object;

export interface StreamConfig<B extends StreamBody = {}> {
  path: string;
  method: "GET" | "POST";
  headers?: Record<string, string>;
  body?: B;
}


export interface StreamOptions {
  signal?: AbortSignal;
  onError(message: string): void;
  onFrame(frame: string): void;
}
