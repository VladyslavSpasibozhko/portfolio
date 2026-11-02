import type { httpSchemas } from "@shared/schemas";

const CHANGE = "change";

export class StreamEmitter extends EventTarget {
  private buffer = "";

  get content(): string {
    return this.buffer;
  }

  emit(event: httpSchemas.StreamResponse): void {
    this.buffer = event.type === "delta" ? this.buffer + event.text : "";
    this.dispatchEvent(new Event(CHANGE));
  }

  subscribe(listener: () => void): () => void {
    this.addEventListener(CHANGE, listener);
    return () => this.removeEventListener(CHANGE, listener);
  }
}
