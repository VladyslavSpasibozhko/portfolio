import type { FastifyInstance } from "fastify";
import * as session from "../services/session.js";
import { common } from "../../shared/schemas/index.js";
import { http } from "../../shared/utils/index.js";
import { ERROR_MESSAGES, badRequest, chatNotFound } from "./constant/errors.js";

const ROUTE_CONFIG = { rateLimit: { max: 20, timeWindow: "1 minute" } };

export async function getChatMessagesRoute(app: FastifyInstance): Promise<void> {
  app.get("/chat/:id/messages", { config: ROUTE_CONFIG }, async ({ params }, reply) => {
    const parsed = common.GetChatMessages.safeParse(params);

    if (!parsed.success) {
      const { status, details } = badRequest(ERROR_MESSAGES.INVALID_GET_CHAT_MESSAGES_PARAMS);
      return reply.status(status).send(http.createErrorResponse(details));
    }

    const history = await session.get(parsed.data.id);
    if (!history) {
      const { status, details } = chatNotFound();
      return reply.status(status).send(http.createErrorResponse(details));
    }

    return http.createResponse(history.messages);
  });
}
