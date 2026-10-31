import type { FastifyInstance } from "fastify";
import { createResponse } from "../../utils/transport.js";
import { config } from "../config/index.js"

const ROUTE_CONFIG = { rateLimit: { max: 20, timeWindow: "1 minute" } };


export async function flags(app: FastifyInstance): Promise<void> {
    app.get("/flags", { config: ROUTE_CONFIG }, async () => {
        return createResponse(config.flags);
    });
}