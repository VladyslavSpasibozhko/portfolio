import type { FastifyInstance } from "fastify";
import { validate, type Schema } from "../lib/validation/index.js";
import * as session from "../services/session.js";
import { createErrorDetails, createErrorResponse, createResponse } from "../../utils/transport.js";

const ROUTE_CONFIG = { rateLimit: { max: 20, timeWindow: "1 minute" } };

interface DeleteChatParams {
  id: string;
}

const DeleteChatParamsSchema: Schema = {
  type: "object",
  properties: { id: { type: "string", minLength: 1 } },
  required: ["id"],
  additionalProperties: false,
};

export function validateDeleteChatParams(params: unknown): DeleteChatParams {
  const result = validate<DeleteChatParams>(params, DeleteChatParamsSchema);
  if (!result.success) {
    throw new Error("Invalid delete chat params: " + result.error);
  }
  return result.data;
}

export async function deleteChatRoute(app: FastifyInstance): Promise<void> {
  app.delete("/chat/:id", { config: ROUTE_CONFIG }, async (request, reply) => {
    let params: DeleteChatParams;
    try {
      params = validateDeleteChatParams(request.params);
    } catch (e) {
      return reply.status(400).send(createErrorResponse(createErrorDetails("bad_request", (e as Error).message, 400)));
    }
    if (!session.remove(params.id)) {
      return reply.status(404).send(createErrorResponse(createErrorDetails("not_found", "Chat not found", 404)));
    }
    return createResponse({ sessionId: params.id });
  });
}
