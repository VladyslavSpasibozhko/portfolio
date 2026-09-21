export interface Session {
    sessionId: string;
}

export type MessageRole = 'user' | 'assistant'

export interface Message extends Session {
    role: MessageRole;
    content: string;
    fileIds?: string[];
}
