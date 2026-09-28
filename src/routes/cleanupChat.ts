import type { FastifyInstance } from "fastify";
import type { Session } from "../../types/main/session.js";
import { validate, type Schema } from "../lib/validation/index.js";
import * as session from "../services/session.js";
import { createErrorDetails, createErrorResponse, createResponse } from "../../utils/transport.js";


type CleanupChatParams = Pick<Session, "sessionId">;

const CleanupChatParamsSchema: Schema = {
  type: "object",
  properties: { sessionId: { type: "string", minLength: 1 } },
  required: ["sessionId"],
  additionalProperties: false,
};

export function validateCleanupChatParams(params: unknown): CleanupChatParams {
  const result = validate<CleanupChatParams>(params, CleanupChatParamsSchema);
  if (!result.success) {
    throw new Error("Invalid cleanup chat params: " + result.error);
  }
  return result.data;
}

export async function cleanupChatRoute(app: FastifyInstance): Promise<void> {
  // The signature covers the raw body, so keep it as a string instead of letting Fastify parse it.
  app.addContentTypeParser(["application/json", "*"], { parseAs: "string" }, (_, body, done) => done(null, body));

  app.post('/internal/cleanup/:sessionId', async (request, reply) => {
    let params: CleanupChatParams;
    try {
      params = validateCleanupChatParams(request.params);
    } catch (e) {
      return reply.status(400).send(createErrorResponse(createErrorDetails("bad_request", (e as Error).message, 400)));
    }
    
    const signature = request.headers["upstash-signature"];
    const verified = typeof signature === "string";

    if (!verified) {
      return reply.status(401).send(createErrorResponse(createErrorDetails("unauthorized", "Invalid signature", 401)));
    }

    const body = typeof request.body === "string" ? request.body : "";

    const isVerified = (await session.verifyCleanup(`/internal/cleanup/${params.sessionId}`, signature, body));
    if (!isVerified) {
      return reply.status(401).send(createErrorResponse(createErrorDetails("unauthorized", "Invalid signature", 401)));
    }

    // Idempotent: QStash retries on non-2xx, and a missing session is already cleaned up.
    await session.remove(params.sessionId);
    return createResponse(true);
  });
}
