import type { Message } from './main/message.js';
import type { Session } from './main/session.js';

export type History = {
    session: Session
    messages: Message[]
}