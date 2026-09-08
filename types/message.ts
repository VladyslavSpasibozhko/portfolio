export type WsMessageRole = 'user' | 'assistant'

export interface WsMessage {
    role: WsMessageRole;
    content: string;
}

export interface WsRequestPayload {
    message: WsMessage;
    history: WsMessage[];
}

export interface WsSuccessResponse {
    success: true;
    message: WsMessage;
}

export interface WsErrorResponse {
    success: false;
    message: string;
}

export type WsResponsePayload = WsSuccessResponse | WsErrorResponse;