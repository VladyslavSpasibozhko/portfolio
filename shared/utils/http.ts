import type { httpSchemas } from "../schemas/index.js";

export function createResponse<T>(data: T): httpSchemas.SuccessResponse<T> {
    return { success: true, data };
}

export function createErrorDetails(reason: string, message: string, code: number): httpSchemas.ErrorDetails {
    return { reason, message, code };
}

export function createErrorResponse(error: httpSchemas.ErrorDetails): httpSchemas.ErrorResponse {
    return { success: false, error };
}

export function createDeltaResponse(text: string): httpSchemas.StreamOf<"delta"> {
    return { type: "delta", text };
}

export function createDoneResponse(): httpSchemas.StreamOf<"done"> {
    return { type: "done" };
}

export function createErrorStreamResponse(message: string): httpSchemas.StreamOf<"error"> {
    return { type: "error", message };
}
