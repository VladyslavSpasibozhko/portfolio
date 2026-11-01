import type { FastifyInstance } from "fastify";
import { config } from "../config/index.js";
import * as ai from "../services/ai/index.js";
import * as session from "../services/session.js";
import { commonSchemas, httpSchemas } from "../../shared/schemas/index.js";
import { httpUtils, commonUtils } from "../../shared/utils/index.js";
import { ERROR_MESSAGES } from "../../shared/errors/messages.js";
import { badRequest, chatNotFound } from "./factories/errors.js";

const ROUTE_CONFIG = { rateLimit: { max: 20, timeWindow: "1 minute" } };

export async function chatRoutes(app: FastifyInstance): Promise<void> {
  app.post("/chat", { config: ROUTE_CONFIG }, async ({ body, log }, reply) => {
    const isValid = commonSchemas.CreateMessageSchema.validate(body);

    if (!isValid) {
      const { status, details } = badRequest(ERROR_MESSAGES.VALIDATION_FAILED);
      return reply.status(status).send(httpUtils.createErrorResponse(details));
    }

    const history = await session.get(body.sessionId);
    if (!history) {
      const { status, details } = chatNotFound();
      return reply.status(status).send(httpUtils.createErrorResponse(details));
    }

    reply.hijack();
    const res = reply.raw;
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": config.clientOrigin,
      Vary: "Origin",
    });

    const controller = new AbortController();
    res.on("close", () => controller.abort());

    const send = (event: httpSchemas.StreamResponse) => {
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    };

    const userMessage = commonUtils.createUserMessage(body.message);
    const messages = [...history.messages, userMessage];

    await ai.chatStream(messages, {
      signal: controller.signal,
      onmessage: (delta) => send(httpUtils.createDeltaResponse(delta)),
    })
      .then((text) => {
        const assistantMessage = commonUtils.createAssistantMessage(text);
        return session.addMessages(body.sessionId, [userMessage, assistantMessage]);
      })
      .then(() => {
        send(httpUtils.createDoneResponse());
      })
      .catch((e) => {
        if (controller.signal.aborted) {
          log.warn(e);
          return;
        }

        log.error(e);
        send(httpUtils.createErrorStreamResponse(ERROR_MESSAGES.UNKNOWN_ERROR));
      })
      .finally(() => {
        res.end();
      });
  });
}
