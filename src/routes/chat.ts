import type { FastifyInstance } from "fastify";
import type { Message } from "../../types/index.js";
import { validate, type Schema } from "../lib/validation/index.js";

const ROUTE_CONFIG = { rateLimit: { max: 20, timeWindow: "1 minute" } };

const ChatRequestSchema: Schema = {
  type: "object",
  properties: {
    sessionId: { type: "string" },
    role: { type: "string", enum: ["user", "assistant"] },
    content: { type: "string" },
    fileIds: { type: "array", items: { type: "string" } },
  },
  required: ["sessionId", "role", "content"],
  additionalProperties: false,
};

export function validateChatRequest(request: unknown): Message {
  const result = validate<Message>(request, ChatRequestSchema);
  if (!result.success) {
    throw new Error("Invalid chat request: " + result.error);
  }
  return result.data;
}

export async function chatRoutes(app: FastifyInstance): Promise<void> {
  app.post("/chat", { config: ROUTE_CONFIG }, async () => {});
}
