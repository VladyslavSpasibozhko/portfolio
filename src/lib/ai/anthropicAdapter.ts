import Anthropic from "@anthropic-ai/sdk";
import type { AIAdapter, Message } from "./types.js";

const MAX_TOKENS = 1024;

export class AnthropicAdapter implements AIAdapter {
  constructor(private client: Anthropic, private model: string) {}

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
}
