import type { FastifyInstance } from "fastify";
import { create, sessionExpiresAt, sessionId } from "../services/session.js";
import { httpUtils } from "../../shared/utils/index.js";
import { serverError } from "./factories/errors.js";

const ROUTE_CONFIG = { rateLimit: { max: 20, timeWindow: "1 minute" } };

export async function createChatRoute(app: FastifyInstance): Promise<void> {
  app.post("/chat/create", { config: ROUTE_CONFIG }, async ({ log }, reply) => {
    try {
      const session = await create(sessionId(), sessionExpiresAt());
      return httpUtils.createResponse(session);
    } catch (e) {
      log.error(e);
      const { status, details } = serverError();
      return reply.status(status).send(httpUtils.createErrorResponse(details));
    }
  });
}
