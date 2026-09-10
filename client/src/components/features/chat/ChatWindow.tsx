import { useRef, type ReactNode } from "react";
import { IconButton } from "@components/molecules/IconButton";
import { Typography } from "@components/atoms/Typography";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import type { WsMessage } from "@types";
import { useClickOutside } from "@hooks/useClickOutside";


interface ChatWindowProps {
  messages: WsMessage[];
  isLoading?: boolean;
  error?: string | null;
  closeWindow: () => void;
  sendMessage: (message: string) => void;
  emptyMessage?: ReactNode;
}

export function ChatWindow({
  messages,
  isLoading = false,
  error = null,
  closeWindow,
  sendMessage,
  emptyMessage,
}: ChatWindowProps) {
  const ref = useRef(null);
  useClickOutside(ref, closeWindow);

  return (
    <div
      ref={ref}
      className="overflow-hidden w-full h-full rounded-2xl shadow-2xl flex flex-col bg-dark-950 border"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Typography tag="h3" className="font-semibold text-lg">
          AI Assistance
        </Typography>
        <IconButton
          icon="close"
          variant="ghost"
          size="md"
          onClick={closeWindow}
          aria-label="Close chat"
        />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          emptyMessage={emptyMessage}
        />
      </div>

      {/* Error */}
      {error && (
        <div className="px-4 py-2 bg-background-error text-text-danger border-t border-red-700/60">
          <Typography tag="small">{error}</Typography>
        </div>
      )}

      {/* Input */}
      <ChatInput onSendMessage={sendMessage} disabled={isLoading} />
    </div>
  );
}
