import { useEffect, useRef, type ReactNode } from "react";
import { ChatMessage } from "./ChatMessage";
import { Loader } from "@components/atoms/Loader";
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
      {messages.map((msg, idx) => (
        <ChatMessage
          key={idx}
          content={msg.content}
          username={msg.role}
          className={
            msg.role === "user"
              ? "flex-row-reverse justify-self-end"
              : "justify-self-start"
          }
        />
      ))}

      {isLoading && <Loader />}

      <div ref={messagesEndRef} />
    </div>
  );
}
