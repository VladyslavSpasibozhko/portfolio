import type { FastifyInstance } from "fastify";
import { create } from "../services/session.js";
import { config } from "../config/index.js";
import { httpUtils } from "@portfolio/shared/utils";

const ROUTE_CONFIG = { rateLimit: { max: 20, timeWindow: "1 minute" } };

export async function createChatRoute(app: FastifyInstance): Promise<void> {
  app.post("/chat/create", { config: ROUTE_CONFIG }, async () => {
    const session = await create({ now: Date.now(), lifeTimeMs: config.sessionLifeTime });
    return httpUtils.createResponse(session);
  });
}
