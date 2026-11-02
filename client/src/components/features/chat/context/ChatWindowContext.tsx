import { createContext, useContext, type ReactNode } from "react";
import { useChatMessages } from "../hooks/useChatMessages";
import type { StatusEmitter } from "../utils/statusEmitter";
import type { StreamEmitter } from "../utils/streamEmitter";
import type { commonSchemas } from "@shared/schemas";

interface ChatWindowContextValue {
  messages: commonSchemas.Message[];
  statusEmitter: StatusEmitter;
  streamEmitter: StreamEmitter;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  retrySendMessage: () => Promise<void>;
}

const ChatWindowContext = createContext<ChatWindowContextValue | null>(null);

interface ChatWindowProviderProps {
  children: ReactNode;
}

export function ChatWindowProvider({ children }: ChatWindowProviderProps) {
  const value = useChatMessages();

  return (
    <ChatWindowContext.Provider value={value}>
      {children}
    </ChatWindowContext.Provider>
  );
}

export function useChatWindowContext() {
  const context = useContext(ChatWindowContext);

  if (!context) {
    throw new Error(
      "useChatWindowContext must be used within a ChatWindowProvider",
    );
  }

  return context;
}
