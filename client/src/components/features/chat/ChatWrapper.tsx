import { useRef, useState } from "react";
import type { Message } from "@global-types/message";
import { createUserMessage, createAssistantMessage } from "@global-utils/message";
import { IconButton } from "@components/molecules/IconButton";
import { ChatWindow } from "./ChatWindow";
import { useChatSession } from "./hooks/useChatSession";
import { useChat } from "./hooks/useChat";

interface ChatWrapperProps {
  avatarUrl?: string;
  username?: string;
}

export function ChatWrapper({}: ChatWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingMessage, setStreamingMessage] = useState<Message | null>(
    null,
  );

  const streamingContentRef = useRef("");
  const sessionIdRef = useRef<string | null>(null);

  const { ensureSession } = useChatSession();

  const {
    sendMessage: sendChatMessage,
    loading,
    error,
  } = useChat({
    onDelta: (text) => {
      streamingContentRef.current += text;
      setStreamingMessage({
        sessionId: sessionIdRef.current as string,
        ...createAssistantMessage(streamingContentRef.current),
      });
    },
    onDone: () => {
      if (!streamingMessage) return;

      setMessages((prev) => [...prev, streamingMessage]);
      streamingContentRef.current = "";
      setStreamingMessage(null);
    },
    onError: () => {
      streamingContentRef.current = "";
      setStreamingMessage(null);
    },
  });

  const handleSendMessage = async (content: string) => {
    const sessionId = await ensureSession();
    if (!sessionId) return;

    sessionIdRef.current = sessionId;

    const userMessage: Message = { ...createUserMessage(content), sessionId };
    setMessages((prev) => [...prev, userMessage]);

    await sendChatMessage({ message: content, sessionId });
  };

  const displayMessages =
    streamingMessage && sessionIdRef.current
      ? [...messages, streamingMessage]
      : messages;

  return (
    <>
      <IconButton
        icon="ai-chat"
        variant="ghost"
        size="4xl"
        className="fixed z-10 bottom-20 right-20 animate-pulse hover:animate-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat"
      />

      {isOpen && (
        <div className="fixed z-40 top-0 left-0 right-0 bottom-0">
          <div className="fixed bottom-20 right-20 z-50 w-full h-screen max-h-800 sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
            <ChatWindow
              messages={displayMessages}
              closeWindow={() => setIsOpen(false)}
              sendMessage={handleSendMessage}
              emptyMessage="Start a conversation"
              isLoading={loading && !streamingMessage}
              error={error}
            />
          </div>
        </div>
      )}
    </>
  );
}
