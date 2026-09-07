import { WsRequestPayload, type WsResponsePayload } from './../../types/index.js';
import type { FastifyInstance } from "fastify";
import { validate, type Schema } from "../lib/validation/index.js";
import { chat } from "../services/ai.js";

const ROUTE_CONFIG = { rateLimit: { max: 20, timeWindow: "1 minute" } };

const WsMessageSchema: Schema = {
  type: "object",
  properties: {
    role: { type: "string", enum: ["user", "assistant"] },
    content: { type: "string" },
  },
  required: ["role", "content"],
  additionalProperties: false,
};

const WsRequestSchema: Schema = {
  type: "object",
  properties: {
    message: WsMessageSchema,
    history: {
      type: "array",
      items: WsMessageSchema,
    },
  },
  required: ["message", "history"],
  additionalProperties: false,
};

const WsResponseSchema: Schema = {
  type: "object",
  oneOf: [
    {
      properties: {
        success: { const: true },
        message: WsMessageSchema,
      },
      required: ["success", "message"],
      additionalProperties: false,
    },
    {
      properties: {
        success: { const: false },
        message: { type: "string" },
      },
      required: ["success", "message"],
      additionalProperties: false,
    },
  ],
};

function parseIncomingMessage(raw: Buffer): WsRequestPayload | null {
  try {
    const parsed = JSON.parse(raw.toString());
    const result = validate<WsRequestPayload>(parsed, WsRequestSchema);
    if (!result.success) return null;
    return result.data;
  } catch {
    return null;
  }
}

function serializeResponse(response: WsResponsePayload): string {
  const result = validate<WsResponsePayload>(response, WsResponseSchema);
  if (!result.success) {
    throw new Error("Failed to build a valid response: " + result.error);
  }
  return JSON.stringify(result.data);
}

function createResponse(content: string): WsResponsePayload {
  return { success: true, message: { role: "assistant", content } };
}

function createErrorResponse(message: string): WsResponsePayload {
  return {
    success: false, message
  };
}

async function receiveMessage(input: WsRequestPayload): Promise<WsResponsePayload> {
  const messages = input.history.concat(input.message);

  try {
    const response = await chat(messages);
    return createResponse(response);
  } catch (err) {
    throw new Error("The assistant hit an error. Try again.");
  }
}

export async function chatRoutes(app: FastifyInstance): Promise<void> {
  app.get(
    "/ws/chat",
    { websocket: true, config: ROUTE_CONFIG },
    (socket) => {
      socket.on("message", async (raw: Buffer) => {
        try {
          const parsed = parseIncomingMessage(raw);
          if (!parsed) {
            socket.send(serializeResponse(createErrorResponse("Invalid request format")));
            return;
          }

          const response = await receiveMessage(parsed);
          socket.send(serializeResponse(response));

        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : "Internal server error.";
          app.log.error("Error processing message: " + errorMessage);
          socket.send(serializeResponse(createErrorResponse(errorMessage)));
        }
      });
    }
  );
}
