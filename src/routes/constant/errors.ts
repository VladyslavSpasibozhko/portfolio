import { codes, messages } from "../../../shared/errors/index.js";
import { httpUtils } from "../../../shared/utils/index.js";

export const { ERROR_CODES } = codes;
export const { ERROR_MESSAGES } = messages;

const createRouteError = (reason: codes.ErrorCode, message: messages.ErrorMessage, status: number) => ({
  status,
  details: httpUtils.createErrorDetails(reason, message, status),
});

export const badRequest = (message: messages.ErrorMessage) =>
  createRouteError(ERROR_CODES.BAD_REQUEST, message, 400);

export const chatNotFound = () =>
  createRouteError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGES.CHAT_NOT_FOUND, 404);

export const serverError = () =>
  createRouteError(ERROR_CODES.SERVER_ERROR, ERROR_MESSAGES.UNKNOWN_ERROR, 500);
