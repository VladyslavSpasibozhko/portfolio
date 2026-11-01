import { z } from 'zod';
import { messages } from '../errors/index.js';

export const MessageRoleSchema = z.enum(['user', 'assistant']);

export const MessageSchema = z.object({
    role: MessageRoleSchema,
    content: z.string(),
    fileIds: z.array(z.string()).optional(),
});

export const SessionSchema = z.object({
    sessionId: z.string(),
    expiresAt: z.number(),
});

export const HistorySchema = z.object({
    session: SessionSchema,
    messages: z.array(MessageSchema),
});

export const CreateChatSchema = z.object({
    message: z.string({ error: messages.ERROR_MESSAGES.MESSAGE_TEXT_TYPE }),
    sessionId: z.string({ error: messages.ERROR_MESSAGES.SESSION_ID_TEXT_TYPE }),
})

export const GetChatMessages = z.object({
    id: z.string({ error: messages.ERROR_MESSAGES.CHAT_ID_NON_EMPTY }).min(1, { error: messages.ERROR_MESSAGES.CHAT_ID_NON_EMPTY }),
})

export const DeleteChatSchema = GetChatMessages;

export type MessageRole = z.infer<typeof MessageRoleSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type Session = z.infer<typeof SessionSchema>;
export type History = z.infer<typeof HistorySchema>;
export type CreateChat = z.infer<typeof CreateChatSchema>;
export type GetChatMessages = z.infer<typeof GetChatMessages>;
export type DeleteChat = z.infer<typeof DeleteChatSchema>;
