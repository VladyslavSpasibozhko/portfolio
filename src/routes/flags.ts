import type { FastifyInstance } from "fastify";
import { config } from "../config/index.js";
import { http } from "../../shared/utils/index.js";

const ROUTE_CONFIG = { rateLimit: { max: 20, timeWindow: "1 minute" } };

export async function flags(app: FastifyInstance): Promise<void> {
    app.get("/flags", { config: ROUTE_CONFIG }, async () => {
        return http.createResponse(config.flags);
    });
}
