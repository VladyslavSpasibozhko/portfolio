import Anthropic from "@anthropic-ai/sdk";
import { config } from "../../config/index.js";
import { AnthropicAdapter } from "./anthropicAdapter.js";
import type { AIAdapter } from "./types.js";

const anthropicClient = new Anthropic({ apiKey: config.anthropicApiKey });

export const aiAdapter: AIAdapter = new AnthropicAdapter(anthropicClient, config.anthropicModel);
export type { AIAdapter, Message, StreamOptions } from "./types.js";
