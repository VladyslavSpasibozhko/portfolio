import type { FastifyInstance } from "fastify";
import * as session from "../services/session.js";
import { commonSchemas } from "../../shared/schemas/index.js";
import { httpUtils } from "../../shared/utils/index.js";
import { ERROR_MESSAGES } from "../../shared/errors/messages.js";
import { badRequest, chatNotFound } from "./constant/errors.js";

const ROUTE_CONFIG = { rateLimit: { max: 20, timeWindow: "1 minute" } };

export async function getChatMessagesRoute(app: FastifyInstance): Promise<void> {
  app.get("/chat/:id/messages", { config: ROUTE_CONFIG }, async ({ params }, reply) => {
    const parsed = commonSchemas.GetChatMessages.safeParse(params);

    if (!parsed.success) {
      const { status, details } = badRequest(ERROR_MESSAGES.INVALID_GET_CHAT_MESSAGES_PARAMS);
      return reply.status(status).send(httpUtils.createErrorResponse(details));
    }

    const history = await session.get(parsed.data.id);
    if (!history) {
      const { status, details } = chatNotFound();
      return reply.status(status).send(httpUtils.createErrorResponse(details));
    }

    return httpUtils.createResponse(history.messages);
  });
}
