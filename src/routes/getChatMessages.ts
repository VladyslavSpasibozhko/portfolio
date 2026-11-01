import type { FastifyInstance } from "fastify";
import * as session from "../services/session.js";
import { common } from "../../shared/schemas/index.js";
import { codes, messages } from "../../shared/errors/index.js";
import { http } from "../../shared/utils/index.js";

const { ERROR_CODES } = codes;
const { ERROR_MESSAGES } = messages;

const ROUTE_CONFIG = { rateLimit: { max: 20, timeWindow: "1 minute" } };

const invalidParams = () => {
  const status = 400;
  const details = http.createErrorDetails(
    ERROR_CODES.BAD_REQUEST,
    ERROR_MESSAGES.INVALID_GET_CHAT_MESSAGES_PARAMS,
    status
  );

  return {
    status,
    details
  }
}

const chatIsNotExisted = () => {
  const status = 404;
  const details = http.createErrorDetails(
    ERROR_CODES.NOT_FOUND,
    ERROR_MESSAGES.CHAT_NOT_FOUND,
    status
  );

  return {
    status,
    details
  }
}

export async function getChatMessagesRoute(app: FastifyInstance): Promise<void> {
  app.get("/chat/:id/messages", { config: ROUTE_CONFIG }, async ({ params }, reply) => {
    const parsed = common.GetChatMessages.safeParse(params);

    if (!parsed.success) {
      const { status, details } = invalidParams();
      return reply.status(status).send(http.createErrorResponse(details));
    }

    const history = await session.get(parsed.data.id);
    if (!history) {
      const { status, details } = chatIsNotExisted();
      return reply.status(status).send(http.createErrorResponse(details));
    }

    return http.createResponse(history.messages);
  });
}
