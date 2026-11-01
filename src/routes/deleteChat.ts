import type { FastifyInstance } from "fastify";
import * as session from "../services/session.js";
import { commonSchemas } from "../../shared/schemas/index.js";
import { httpUtils } from "../../shared/utils/index.js";
import { ERROR_MESSAGES } from "../../shared/errors/messages.js";
import { badRequest, chatNotFound } from "./factories/errors.js";

const ROUTE_CONFIG = { rateLimit: { max: 20, timeWindow: "1 minute" } };

export async function deleteChatRoute(app: FastifyInstance): Promise<void> {
  app.delete("/chat/:id", { config: ROUTE_CONFIG }, async ({ params }, reply) => {
    const parsed = commonSchemas.ChatIdSchema.safeParse(params);

    if (!parsed.success) {
      const { status, details } = badRequest(ERROR_MESSAGES.INVALID_DELETE_CHAT_PARAMS);
      return reply.status(status).send(httpUtils.createErrorResponse(details));
    }

    const removed = await session.remove(parsed.data.id);
    if (!removed) {
      const { status, details } = chatNotFound();
      return reply.status(status).send(httpUtils.createErrorResponse(details));
    }

    return httpUtils.createResponse(removed);
  });
}
