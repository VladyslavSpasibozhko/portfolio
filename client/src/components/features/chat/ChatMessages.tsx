import { useEffect, useRef, type ReactNode } from "react";
import { ChatUserMessage } from "./ChatUserMessage";
import { ChatAssistantMessage } from "./ChatAssistantMessage";
import { ChatMessageLoading } from "./ChatMessageLoading";
import { EmptyState } from "@components/molecules/EmptyState";
import type { WsMessage } from "@types";

interface ChatMessagesProps {
  messages: WsMessage[];
  isLoading?: boolean;
  emptyMessage?: ReactNode;
}

export function ChatMessages({
  messages,
  isLoading = false,
  emptyMessage = "Start a conversation",
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return <EmptyState>{emptyMessage}</EmptyState>;
  }

  return (
    <div className="space-y-4">
      {messages.map((msg, idx) =>
        msg.role === "user" ? (
          <ChatUserMessage
            key={idx}
            content={msg.content}
            username={msg.role}
            className="flex-row-reverse justify-self-end"
          />
        ) : (
          <ChatAssistantMessage
            key={idx}
            content={msg.content}
            username={msg.role}
            className="justify-self-start"
          />
        )
      )}

      {isLoading && (
        <div className="justify-self-start">
          <ChatMessageLoading  />
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
