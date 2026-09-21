import type {
  ErrorDetails,
  ErrorResponse,
  StreamResponse,
  SuccessResponse,
} from "../../types/index.js";

type StreamOf<T extends StreamResponse['type']> = Extract<StreamResponse, { type: T }>;

export function createResponse<T>(data: T): SuccessResponse<T> {
  return { success: true, data };
}

export function createErrorDetails(reason: string, message: string, code: number): ErrorDetails {
  return { reason, message, code };
}

export function createErrorResponse(error: ErrorDetails): ErrorResponse {
  return { success: false, error };
}

export function createDeltaResponse(text: string): StreamOf<"delta"> {
  return { type: "delta", text };
}

export function createDoneResponse(): StreamOf<"done"> {
  return { type: "done" };
}

export function createErrorStreamResponse(message: string): StreamOf<"error"> {
  return { type: "error", message };
}

export function createBlockResponse(): StreamOf<"block"> {
  return { type: "block" };
}
