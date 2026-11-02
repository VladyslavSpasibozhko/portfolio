import type { httpSchemas } from "@shared/schemas";

const CHANGE = "change";

export class StreamEmitter extends EventTarget {
  private buffer = "";

  get content(): string {
    return this.buffer;
  }

  private append(text: string) {
    this.buffer = this.buffer + text
  }

  private clear() {
    this.buffer = '';
  }

  emit(event: httpSchemas.StreamResponse): void {
    if (event.type === "delta") this.append(event.text);
    if (event.type === 'done' || event.type === 'error') {
      this.clear();
    };

    this.dispatchEvent(new Event(CHANGE));
  }

  subscribe(listener: () => void): () => void {
    this.addEventListener(CHANGE, listener);
    return () => this.removeEventListener(CHANGE, listener);
  }
}
