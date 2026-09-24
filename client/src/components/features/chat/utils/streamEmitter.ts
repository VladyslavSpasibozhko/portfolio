import type { StreamResponse } from "@global-types/transport";

export type StreamEvent = CustomEvent<StreamResponse>;

export class StreamEmitter extends EventTarget {
  private buffer = "";

  get content(): string {
    return this.buffer;
  }

  delta(text: string): void {
    this.buffer += text;
    this.dispatchEvent(
      new CustomEvent<StreamResponse>("delta", { detail: { type: "delta", text } }),
    );
  }

  done(): void {
    this.dispatchEvent(new CustomEvent<StreamResponse>("done", { detail: { type: "done" } }));
    this.buffer = "";
  }

  error(message: string): void {
    this.dispatchEvent(
      new CustomEvent<StreamResponse>("error", { detail: { type: "error", message } }),
    );
    this.buffer = "";
  }
}
