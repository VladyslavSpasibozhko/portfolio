import type { FastifyError, FastifyInstance } from "fastify";
import { httpUtils } from "../../shared/utils/index.js";
import { messages } from "../../shared/errors/index.js";
import { ERROR_STATUSES, serverError, payloadTooLarge, tooManyRequests, badRequest } from "../lib/http/index.js";

const ERRORS_BY_STATUS = {
  [ERROR_STATUSES.SERVER_ERROR]: serverError(),
  [ERROR_STATUSES.PAYLOAD_TOO_LARGE]: payloadTooLarge(),
  [ERROR_STATUSES.TOO_MANY_REQUESTS]: tooManyRequests(),
  [ERROR_STATUSES.BAD_REQUEST]: badRequest(messages.ERROR_MESSAGES.VALIDATION_FAILED),
} as const;

export function registerErrorHandler(app: FastifyInstance): void {
  app.setErrorHandler<FastifyError>((error, request, reply) => {
    request.log.error(error);

    const errorStatus = error.statusCode ?? ERROR_STATUSES.SERVER_ERROR;
    const { status, details } = ERRORS_BY_STATUS[errorStatus] ?? serverError();
    return reply.status(status).send(httpUtils.createErrorResponse(details));
  });
}
