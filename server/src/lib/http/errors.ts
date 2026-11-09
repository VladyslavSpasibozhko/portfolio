import { codes, messages } from "@portfolio/shared/errors";
import { httpUtils } from "@portfolio/shared/utils";

const { ERROR_CODES } = codes;
const { ERROR_MESSAGES } = messages;

export const ERROR_STATUSES = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  PAYLOAD_TOO_LARGE: 413,
  TOO_MANY_REQUESTS: 429,
  SERVER_ERROR: 500,
};

const createRouteError = (reason: codes.ErrorCode, message: messages.ErrorMessage, status: number) => ({
  status,
  details: httpUtils.createErrorDetails(reason, message, status),
});

export const badRequest = (message: messages.ErrorMessage) => {
  return createRouteError(ERROR_CODES.BAD_REQUEST, message, ERROR_STATUSES.BAD_REQUEST);
};

export const chatNotFound = () => {
  return createRouteError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGES.CHAT_NOT_FOUND, ERROR_STATUSES.NOT_FOUND);
};

export const payloadTooLarge = () => {
  return createRouteError(ERROR_CODES.PAYLOAD_TOO_LARGE, ERROR_MESSAGES.PAYLOAD_TOO_LARGE, ERROR_STATUSES.PAYLOAD_TOO_LARGE);
};

export const tooManyRequests = () => {
  return createRouteError(ERROR_CODES.TOO_MANY_REQUESTS, ERROR_MESSAGES.TOO_MANY_REQUESTS, ERROR_STATUSES.TOO_MANY_REQUESTS);
};

export const serverError = () => {
  return createRouteError(ERROR_CODES.SERVER_ERROR, ERROR_MESSAGES.UNKNOWN_ERROR, ERROR_STATUSES.SERVER_ERROR);
};
