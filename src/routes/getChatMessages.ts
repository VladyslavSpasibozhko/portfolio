import type { FastifyInstance } from "fastify";
import type { GetChatMessagesRequest } from "../../types/api.js";
import { validate } from "../lib/validation/index.js";
import * as session from "../services/session.js";
import { createErrorDetails, createErrorResponse, createResponse } from "../../utils/transport.js";
import { ChatIdParamsSchema, ChatIdParamsErrors } from "./schemas/chatIdParams.js";

const ROUTE_CONFIG = { rateLimit: { max: 20, timeWindow: "1 minute" } };

export function validateGetChatMessagesParams(params: unknown): GetChatMessagesRequest {
  const result = validate<GetChatMessagesRequest>(params, ChatIdParamsSchema, ChatIdParamsErrors);
  if (!result.success) {
    throw new Error("Invalid get chat messages params: " + result.error);
  }
  return result.data;
}

export async function getChatMessagesRoute(app: FastifyInstance): Promise<void> {
  app.get("/chat/:id/messages", { config: ROUTE_CONFIG }, async (request, reply) => {
    let params: GetChatMessagesRequest;
    try {
      params = validateGetChatMessagesParams(request.params);
    } catch (e) {
      return reply.status(400).send(createErrorResponse(createErrorDetails("bad_request", (e as Error).message, 400)));
    }
    const messages = session.get(params.id);
    if (!messages) {
      return reply.status(404).send(createErrorResponse(createErrorDetails("not_found", "Chat not found", 404)));
    }
    return createResponse(messages);
  });
}