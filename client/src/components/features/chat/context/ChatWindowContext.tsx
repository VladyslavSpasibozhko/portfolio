import { createContext, useContext, type ReactNode } from "react";
import { useChatMessages } from "../hooks/useChatMessages";
import type { ChatStatus } from "../hooks/useChatMessages";
import type { Message } from "@global-types/message";

interface ChatWindowContextValue {
  messages: Message[];
  status: ChatStatus;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  retrySendMessage: () => Promise<void>;
  isGenerating: boolean;
  isWaiting: boolean;
  isFailed: boolean;
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
