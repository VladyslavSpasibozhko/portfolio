import type { FastifyInstance } from "fastify";
import { config } from "../config/index.js";
import type { ChatRequest, ChatResponse } from "../../types/api.js";
import { validate, type Schema, type ErrorsDictionary } from "../lib/validation/index.js";
import * as ai from "../services/ai/index.js";
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

const ChatRequestErrors: ErrorsDictionary = {
  root: "Request must include a message and a sessionId, with no extra fields.",
  message: "Message must be text.",
  sessionId: "Session ID must be text.",
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
  const result = validate<ChatRequest>(request, ChatRequestSchema, ChatRequestErrors);
  if (!result.success) {
    throw new Error("Invalid chat request: " + result.error);
  }
  return result.data;
}

const validateBody = (body: unknown) => {
  try {
    return { success: true, data: validateChatRequest(body) } as const
  } catch (e) {
    // TODO: type errors
    return { success: false, error: createErrorDetails("bad_request", getErrorMessage(e), 400) } as const
  }

}

const getErrorMessage = (e: unknown) => {
  if (e instanceof Error) {
    return e.message;
  }
  // TODO: type errors
  return 'Unknown error';
}

export async function chatRoutes(app: FastifyInstance): Promise<void> {
  app.post("/chat", { config: ROUTE_CONFIG }, async (request, reply) => {
    const body = validateBody(request.body);

    if (!body.success) {
      return reply.status(400).send(createErrorResponse(body.error));
    }

    const history = await session.get(body.data.sessionId);
    if (!history) {
      return reply.status(404).send(createErrorResponse(createErrorDetails("not_found", "Chat not found", 404)));
    }


    reply.hijack();
    const res = reply.raw;
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": config.clientOrigin,
      Vary: "Origin",
    });

    const controller = new AbortController();
    res.on("close", () => controller.abort());

    const send = (event: ChatResponse) => {
      res.write(`data: ${JSON.stringify(validateChatResponse(event))}\n\n`);
    }

    const userMessage = createUserMessage(body.data.message);
    const messages = [...history.messages, userMessage];

    await ai.chatStream(messages, {
      signal: controller.signal,
      onmessage: (delta) => send(createDeltaResponse(delta)),
    })
      .then(text => {
        const assistantMessage = createAssistantMessage(text);
        return session.addMessages(body.data.sessionId, [userMessage, assistantMessage]);
      })
      .then(() => {
        send(createDoneResponse());
      })
      .catch(e => {
        if (controller.signal.aborted) {
          request.log.warn(e);
          return;
        }

        request.log.error(e);
        // TODO: fix raw error.
        send(createErrorStreamResponse(getErrorMessage(e)));
      })
      .finally(() => {
        res.end();
      })
  });
}
