import cors from "@fastify/cors";
import type { FastifyInstance } from "fastify";

export async function registerCors(app: FastifyInstance): Promise<void> {
  const origin = process.env.CLIENT_ORIGIN;
  if (!origin) {
    throw new Error("CLIENT_ORIGIN is not set. Copy .env.example to .env and fill it in.");
  }

  await app.register(cors, { origin });
}
