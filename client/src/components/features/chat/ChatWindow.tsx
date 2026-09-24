import type { ReactNode } from "react";
import { IconButton } from "@components/molecules/IconButton";
import { Typography } from "@components/atoms/Typography";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import type { Message } from "@global-types/message";


interface ChatWindowProps {
  messages: Message[];
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
  return (
    <div className="overflow-hidden w-full h-full rounded-2xl flex flex-col bg-background-950 border border-border-focus shadow-md shadow-accent-sky">
      {/* Header */}
      <div className="flex items-center justify-between p-16 bg-background-850">
        <Typography tag="h3" className="font-semibold text-18 text-text-sky">
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
      <div className="flex-1 overflow-y-auto p-16">
        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          emptyMessage={emptyMessage}
        />
      </div>

      {/* Error */}
      {error && (
        <div className="px-16 py-8 bg-background-error text-text-danger border-t border-red-700/60">
          <Typography tag="small">{error}</Typography>
        </div>
      )}

      {/* Input */}
      <ChatInput onSendMessage={sendMessage} disabled={isLoading} />
    </div>
  );
}
