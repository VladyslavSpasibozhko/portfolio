import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { aiAdapter, type Message, type StreamOptions } from "../lib/ai/index.js";

const PROFILE_MD_PATH = fileURLToPath(
  new URL("../../data/profile.md", import.meta.url)
);

function systemPrompt(): string {
  const profileContext = readFileSync(PROFILE_MD_PATH, "utf-8");

  return [
    "You are an assistant embedded in a developer portfolio, answering recruiters' and hiring managers' questions about the person described below.",
    "Answer only using the facts below. If something isn't covered by these facts, say so plainly instead of guessing or inventing details.",
    "Keep answers concise and factual.",
    "",
    profileContext,
  ].join("\n");
}

export async function chat(messages: Message[]): Promise<string> {
  return aiAdapter.sendMessage(messages, systemPrompt());
}

export async function chatStream(messages: Message[], options?: StreamOptions): Promise<void> {
  return aiAdapter.streamMessage(messages, systemPrompt(), options);
}
