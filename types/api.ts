/**
 * Request/response contracts for the HTTP routes (`src/routes/`), one pair
 * per route (input, output).
 */

import type { Session } from './session.js';
import type { StreamResponse } from './transport.js';

/** POST /chat */
export interface ChatRequest {
    message: string;
    sessionId: string;
}

export type ChatResponse = StreamResponse;

/** POST /chat/create */
export type CreateChatResponse = Session;

/** DELETE /chat/:id */
export interface DeleteChatRequest {
    id: string;
}

export type DeleteChatResponse = boolean;
