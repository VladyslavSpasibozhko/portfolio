import { aiAdapter, type Message, type StreamOptions } from "../../lib/ai/index.js";
import { systemPrompt } from "./prompts.js";

export async function chat(messages: Message[]): Promise<string> {
  return aiAdapter.sendMessage(messages, systemPrompt());
}

export async function chatStream(messages: Message[], options?: StreamOptions): Promise<string> {
  return aiAdapter.streamMessage(messages, systemPrompt(), options);
}
