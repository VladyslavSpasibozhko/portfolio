import { useEffect, useRef, type ReactNode } from "react";
import { ChatUserMessage } from "./ChatUserMessage";
import { ChatAssistantMessage } from "./ChatAssistantMessage";
import { ChatMessageLoading } from "./ChatMessageLoading";
import { EmptyState } from "@components/molecules/EmptyState";
import { useChatWindowContext } from "./context/ChatWindowContext";
import type { MessageRole } from "@global-types/message";

interface ChatMessagesProps {
  emptyMessage?: ReactNode;
}

export function ChatMessages({
  emptyMessage = "Start a conversation",
}: ChatMessagesProps) {
  const { messages, isWaiting: isLoading } = useChatWindowContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const NAMES: Record<MessageRole, string> = {
    assistant: "AI Assistant",
    user: "User",
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isLoading]);

  if (messages.length === 0 && !isLoading) {
    return <EmptyState>{emptyMessage}</EmptyState>;
  }

  return (
    <div className="space-y-24">
      {messages.map((msg, idx) =>
        msg.role === "user" ? (
          <ChatUserMessage
            key={idx}
            content={msg.content}
            username={NAMES[msg.role]}
          />
        ) : (
          <ChatAssistantMessage
            key={idx}
            content={msg.content}
            username={NAMES[msg.role]}
          />
        ),
      )}

      {isLoading && (
        <div className="justify-self-start">
          <ChatMessageLoading />
        </div>
      )}

      <div className="p-16" ref={messagesEndRef} />
    </div>
  );
}
