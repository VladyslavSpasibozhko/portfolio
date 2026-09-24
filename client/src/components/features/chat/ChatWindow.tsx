import type { ReactNode } from "react";
import { IconButton } from "@components/molecules/IconButton";
import { Button } from "@components/atoms/Button";
import { Typography } from "@components/atoms/Typography";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { useChatWindowContext } from "./context/ChatWindowContext";

interface ChatWindowProps {
  closeWindow: () => void;
  emptyMessage?: ReactNode;
}

export function ChatWindow({ closeWindow, emptyMessage }: ChatWindowProps) {
  const { error, retrySendMessage, isFailed } = useChatWindowContext();

  return (
    <div className="overflow-hidden w-full h-full rounded-2xl flex flex-col bg-background-950 border border-border-focus shadow-md shadow-accent-sky">
      {/* Header */}
      <div className="flex items-center justify-between p-16 bg-background-850 border-b border-border-focus">
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
        <ChatMessages emptyMessage={emptyMessage} />
      </div>

      {/* Error */}
      {isFailed && error && (
        <div className="flex items-center justify-between gap-16 px-16 py-8 bg-background-error text-text-danger border-t border-red-700/60">
          <Typography tag="small">{error}</Typography>
          <Button
            variant="secondary"
            size="sm"
            onClick={retrySendMessage}
          >
            Retry
          </Button>
        </div>
      )}

      {/* Input */}
      <ChatInput />
    </div>
  );
}
