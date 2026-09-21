import Anthropic from "@anthropic-ai/sdk";
import type { AIAdapter, Message, StreamOptions } from "./types.js";

const MAX_TOKENS = 1024;

export class AnthropicAdapter implements AIAdapter {
  constructor(private client: Anthropic, private model: string) { }

  async sendMessage(messages: Message[], system: string): Promise<string> {
    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: MAX_TOKENS,
      system,
      messages,
    });

    return response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("");
  }

  async streamMessage(
    messages: Message[],
    system: string,
    options: StreamOptions = {}
  ): Promise<void> {
    const { onmessage, onerror, onabort, onend, signal } = options;

    const stream = this.client.messages.stream(
      { model: this.model, max_tokens: MAX_TOKENS, system, messages },
      { signal }
    );

    if (onmessage) stream.on("text", onmessage);
    if (onabort) stream.on("abort", onabort);
    if (onend) stream.on("end", onend);
    stream.on("error", (error) => {
      if (onerror) onerror(error.message)
    });

    try {
      await stream.done();
    } catch {
      // reported through the onerror / onabort callbacks
    }
  }
}
