import type { FastifyInstance } from "fastify";
import { create, remove, setSessionCleanup } from "../services/session.js";
import { createErrorDetails, createErrorResponse, createResponse } from "../../utils/transport.js";

const ROUTE_CONFIG = { rateLimit: { max: 20, timeWindow: "1 minute" } };

export async function createChatRoute(app: FastifyInstance): Promise<void> {
  app.post("/chat/create", { config: ROUTE_CONFIG }, async (_, reply) => {
    const session = await create();

    try {
      await setSessionCleanup(`/internal/cleanup/${session.sessionId}`, session)
      return createResponse(session);
    } catch (e) {
      await remove(session.sessionId);
      return reply.status(500).send(createErrorResponse(createErrorDetails("server_error", (e as Error).message, 500)));
    }
  });
}
