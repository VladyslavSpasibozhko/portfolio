import type { FastifyInstance } from "fastify";
import * as session from "../services/session.js";
import { common } from "../../shared/schemas/index.js";
import { codes, messages } from "../../shared/errors/index.js";
import { http as httpUtils } from "../../shared/utils/index.js";

const { ERROR_CODES } = codes;
const { ERROR_MESSAGES } = messages;

const ROUTE_CONFIG = { rateLimit: { max: 20, timeWindow: "1 minute" } };

const invalidParams = () => {
  const status = 400;
  const details = httpUtils.createErrorDetails(
    ERROR_CODES.BAD_REQUEST,
    ERROR_MESSAGES.INVALID_DELETE_CHAT_PARAMS,
    status
  );

  return {
    status,
    details
  }
}

const chatIsNotExisted = () => {
  const status = 404;
  const details = httpUtils.createErrorDetails(
    ERROR_CODES.NOT_FOUND,
    ERROR_MESSAGES.CHAT_NOT_FOUND,
    status
  );

  return {
    status,
    details
  }
}

export async function deleteChatRoute(app: FastifyInstance): Promise<void> {
  app.delete("/chat/:id", { config: ROUTE_CONFIG }, async ({ params }, reply) => {
    const parsed = common.DeleteChatSchema.safeParse(params);

    if (!parsed.success) {
      const { status, details } = invalidParams();
      return reply.status(status).send(httpUtils.createErrorResponse(details));
    }

    const removed = await session.remove(parsed.data.id);
    if (!removed) {
      const { status, details } = chatIsNotExisted();
      return reply.status(status).send(httpUtils.createErrorResponse(details));
    }

    return httpUtils.createResponse(removed);
  });
}
