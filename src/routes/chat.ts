import type { FastifyInstance } from "fastify";
import type { ChatRequest, ChatResponse } from "../../types/api.js";
import { validate, type Schema } from "../lib/validation/index.js";
import * as ai from "../services/ai.js";
import * as session from "../services/session.js";
import { createAssistantMessage, createUserMessage } from "../../utils/message.js";
import {
  createDeltaResponse,
  createDoneResponse,
  createErrorDetails,
  createErrorResponse,
  createErrorStreamResponse,
} from "../../utils/transport.js";

const ROUTE_CONFIG = { rateLimit: { max: 20, timeWindow: "1 minute" } };

const ChatRequestSchema: Schema = {
  type: "object",
  properties: {
    message: { type: "string" },
    sessionId: { type: "string" },
  },
  required: ["message", "sessionId"],
  additionalProperties: false,
};

const ChatResponseSchema: Schema = {
  oneOf: [
    {
      type: "object",
      properties: { type: { const: "delta" }, text: { type: "string" } },
      required: ["type", "text"],
      additionalProperties: false,
    },
    {
      type: "object",
      properties: { type: { const: "done" } },
      required: ["type"],
      additionalProperties: false,
    },
    {
      type: "object",
      properties: { type: { const: "error" }, message: { type: "string" } },
      required: ["type", "message"],
      additionalProperties: false,
    },
    {
      type: "object",
      properties: { type: { const: "block" } },
      required: ["type"],
      additionalProperties: false,
    },
  ],
};

export function validateChatResponse(response: unknown): ChatResponse {
  const result = validate<ChatResponse>(response, ChatResponseSchema);
  if (!result.success) {
    throw new Error("Invalid chat response: " + result.error);
  }
  return result.data;
}

export function validateChatRequest(request: unknown): ChatRequest {
  const result = validate<ChatRequest>(request, ChatRequestSchema);
  if (!result.success) {
    throw new Error("Invalid chat request: " + result.error);
  }
  return result.data;
}

export async function chatRoutes(app: FastifyInstance): Promise<void> {
  app.post("/chat", { config: ROUTE_CONFIG }, async (request, reply) => {
    let body: ChatRequest;
    try {
      body = validateChatRequest(request.body);
    } catch (e) {
      return reply.status(400).send(createErrorResponse(createErrorDetails("bad_request", (e as Error).message, 400)));
    }

    const history = session.get(body.sessionId);
    if (!history) {
      return reply.status(404).send(createErrorResponse(createErrorDetails("not_found", "Chat not found", 404)));
    }

    const messages = [...history, createUserMessage(body.message)];

    reply.hijack();
    const res = reply.raw;
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": process.env.CLIENT_ORIGIN as string,
      Vary: "Origin",
    });

    const controller = new AbortController();
    res.on("close", () => controller.abort());

    const send = (event: ChatResponse) =>
      res.write(`data: ${JSON.stringify(validateChatResponse(event))}\n\n`);

    try {
      const text = await ai.chatStream(messages, {
        signal: controller.signal,
        onmessage: (delta) => send(createDeltaResponse(delta)),
        onerror: (message) => send(createErrorStreamResponse(message)),
      });
      session.set(body.sessionId, [...messages, createAssistantMessage(text)]);
      send(createDoneResponse());
    } catch (e) {
      if (!controller.signal.aborted) {
        request.log.error(e);
      }
    } finally {
      res.end();
    }
  });
}
