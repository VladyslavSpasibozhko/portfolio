import Anthropic from "@anthropic-ai/sdk";
import { AnthropicAdapter } from "./anthropicAdapter.js";
import type { AIAdapter } from "./types.js";

const apiKey = process.env.ANTHROPIC_API_KEY;
const model = process.env.ANTHROPIC_MODEL;

if (!apiKey) {
  throw new Error("ANTHROPIC_API_KEY is not set. Copy .env.example to .env and fill it in.");
}

if (!model) {
  throw new Error("ANTHROPIC_MODEL is not set. Copy .env.example to .env and fill it in.");
}

const anthropicClient = new Anthropic({ apiKey });
const anthropicModel = model;

export const aiAdapter: AIAdapter = new AnthropicAdapter(anthropicClient, anthropicModel);
export type { AIAdapter, Message } from "./types.js";
