import type { FastifyInstance } from "fastify";
import { create } from "../services/session.js";
import { createErrorDetails, createErrorResponse, createResponse } from "../../utils/transport.js";

const ROUTE_CONFIG = { rateLimit: { max: 20, timeWindow: "1 minute" } };

export async function createChatRoute(app: FastifyInstance): Promise<void> {
  app.post("/chat/create", { config: ROUTE_CONFIG }, async (_, reply) => {
    try {
      return createResponse(await create());
    } catch (e) {
      return reply.status(500).send(createErrorResponse(createErrorDetails("server_error", (e as Error).message, 500)));
    }
  });
}
