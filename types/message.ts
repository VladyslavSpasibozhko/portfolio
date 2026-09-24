export type MessageRole = 'user' | 'assistant'

export interface Message {
    sessionId: string;
    role: MessageRole;
    content: string;
    fileIds?: string[];
}
