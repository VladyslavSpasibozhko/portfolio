export interface Session {
    sessionId: string;
}

export type MessageRole = 'user' | 'assistant'

// TODO: change it;
export interface Message extends Session {
    role: MessageRole;
    content: string;
    fileIds?: string[];
}
