export interface ErrorDetails {
    reason: string;
    message: string;
    code: number;
}

export interface SuccessResponse<T> {
    success: true;
    data: T;
}

export interface ErrorResponse {
    success: false;
    error: ErrorDetails;
}

export type Response<T> = SuccessResponse<T> | ErrorResponse;

// Clients must ignore unknown `type`s.
export type StreamResponse =
    | { type: 'delta'; text: string }
    | { type: 'done' }
    | { type: 'error'; message: string }
    | { type: 'block' };
