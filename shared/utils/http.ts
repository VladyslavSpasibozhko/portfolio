import type { http } from "../schemas/index.js";

export function createResponse<T>(data: T): http.SuccessResponse<T> {
    return { success: true, data };
}

export function createErrorDetails(reason: string, message: string, code: number): http.ErrorDetails {
    return { reason, message, code };
}

export function createErrorResponse(error: http.ErrorDetails): http.ErrorResponse {
    return { success: false, error };
}

export function createDeltaResponse(text: string): http.StreamOf<"delta"> {
    return { type: "delta", text };
}

export function createDoneResponse(): http.StreamOf<"done"> {
    return { type: "done" };
}

export function createErrorStreamResponse(message: string): http.StreamOf<"error"> {
    return { type: "error", message };
}
