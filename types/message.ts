export interface WsMessage {
    role: 'user' | 'assistant';
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