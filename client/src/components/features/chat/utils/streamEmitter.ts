import type { httpSchemas } from "@shared/schemas";

export type StreamEvent = CustomEvent<httpSchemas.StreamResponse>;

export class StreamEmitter extends EventTarget {
  private buffer = "";

  get content(): string {
    return this.buffer;
  }

  delta(text: string): void {
    this.buffer += text;
    this.dispatchEvent(
      new CustomEvent<httpSchemas.StreamResponse>("delta", { detail: { type: "delta", text } }),
    );
  }

  done(): void {
    this.dispatchEvent(new CustomEvent<httpSchemas.StreamResponse>("done", { detail: { type: "done" } }));
    this.buffer = "";
  }

  error(message: string): void {
    this.dispatchEvent(
      new CustomEvent<httpSchemas.StreamResponse>("error", { detail: { type: "error", message } }),
    );
    this.buffer = "";
  }
}
