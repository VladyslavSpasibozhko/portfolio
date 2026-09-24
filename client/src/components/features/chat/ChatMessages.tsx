import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChatUserMessage } from "./ChatUserMessage";
import { ChatAssistantMessage } from "./ChatAssistantMessage";
import { ChatStreamingMessage } from "./ChatStreamingMessage";
import { ChatMessageLoading } from "./ChatMessageLoading";
import { EmptyState } from "@components/molecules/EmptyState";
import { useChatWindowContext } from "./context/ChatWindowContext";
import type { StatusChangeEvent, StreamStatus } from "./utils/statusEmitter";
import type { MessageRole } from "@global-types/message";

interface ChatMessagesProps {
  emptyMessage?: ReactNode;
}

export function ChatMessages({
  emptyMessage = "Start a conversation",
}: ChatMessagesProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { messages, statusEmitter } = useChatWindowContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const NAMES: Record<MessageRole, string> = {
    assistant: "AI Assistant",
    user: "User",
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    });
  };

  useEffect(() => {
    const handleLoading = (status: StreamStatus) => {
      setIsLoading(status === "waiting");
    };

    const handleAutoScroll = (status: StreamStatus) => {
      const statuses: StreamStatus[] = [
        "idle",
        "waiting",
        "generating",
        "generated",
      ];

      if (statuses.includes(status)) {
        scrollToBottom();
      }
    };

    const handleChange = (event: Event) => {
      handleLoading((event as StatusChangeEvent).detail);
      handleAutoScroll((event as StatusChangeEvent).detail);
    };

    statusEmitter.addEventListener("change", handleChange);
    return () => statusEmitter.removeEventListener("change", handleChange);
  }, [statusEmitter]);

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

      <ChatStreamingMessage username={NAMES.assistant} />

      {isLoading && (
        <div className="justify-self-start">
          <ChatMessageLoading />
        </div>
      )}

      <div className="p-16" ref={messagesEndRef} />
    </div>
  );
}
