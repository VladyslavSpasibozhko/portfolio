import type { FastifyError, FastifyInstance } from "fastify";
import { codes, messages } from "../../shared/errors/index.js";
import { httpUtils } from "../../shared/utils/index.js";

export function registerErrorHandler(app: FastifyInstance): void {
  app.setErrorHandler<FastifyError>((error, request, reply) => {
    request.log.error(error);

    const status = error.statusCode ?? 500;
    const details = httpUtils.createErrorDetails(
      codes.ERROR_CODES.SERVER_ERROR,
      messages.ERROR_MESSAGES.UNKNOWN_ERROR,
      status,
    );

    return reply.status(status).send(httpUtils.createErrorResponse(details));
  });
}
