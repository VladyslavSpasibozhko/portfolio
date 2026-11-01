import type { FastifyInstance } from "fastify";
import { create } from "../services/session.js";
import { codes, messages } from "../../shared/errors/index.js";
import { http as httpUtils } from "../../shared/utils/index.js";

const { ERROR_CODES } = codes;
const { ERROR_MESSAGES } = messages;

const ROUTE_CONFIG = { rateLimit: { max: 20, timeWindow: "1 minute" } };

const serverError = () => {
  const status = 500;
  const details = httpUtils.createErrorDetails(
    ERROR_CODES.SERVER_ERROR,
    ERROR_MESSAGES.UNKNOWN_ERROR,
    status
  );

  return {
    status,
    details
  }
}

export async function createChatRoute(app: FastifyInstance): Promise<void> {
  app.post("/chat/create", { config: ROUTE_CONFIG }, async ({ log }, reply) => {
    try {
      return httpUtils.createResponse(await create());
    } catch (e) {
      log.error(e);
      const { status, details } = serverError();
      return reply.status(status).send(httpUtils.createErrorResponse(details));
    }
  });
}
