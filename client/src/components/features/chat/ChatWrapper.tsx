import { useState } from "react";
import type { Message } from "@types";
import { IconButton } from "@components/molecules/IconButton";
import { ChatWindow } from "./ChatWindow";

interface ChatWrapperProps {
  avatarUrl?: string;
  username?: string;
}

// TODO: wire this up to the sessionId once the transport is implemented.
// const defaultMessage = messageFactory(
//   "",
//   "Hey there! 👋 Thanks for stopping by — feel free to ask me anything about my work, experience, or projects.",
//   "assistant",
// );

export function ChatWrapper({}: ChatWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  // TODO: send the message over the new /chat transport; this only echoes it locally for now.
  const handleSendMessage = (content: string) => {
  };

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
              messages={messages}
              closeWindow={() => setIsOpen(false)}
              sendMessage={handleSendMessage}
              emptyMessage="Start a conversation"
              isLoading={isResponding}
            />
          </div>
        </div>
      )}
    </>
  );
}
