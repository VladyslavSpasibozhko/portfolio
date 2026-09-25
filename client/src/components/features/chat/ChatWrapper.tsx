import { useState } from "react";
import { Icon } from "@components/atoms/Icon";
import { Typography } from "@components/atoms/Typography";
import { ChatWindow } from "./ChatWindow";
import { ChatWindowProvider } from "./context/ChatWindowContext";

interface ChatWrapperProps {
  avatarUrl?: string;
  username?: string;
}

export function ChatWrapper({}: ChatWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
          className="fixed z-30 bottom-16 right-16 md:bottom-24 md:right-24 xl:bottom-32 xl:right-32 isolate overflow-hidden flex items-center gap-6 md:gap-8 px-12 py-8 md:px-16 md:py-12 xl:px-20 xl:py-16 rounded-full cursor-pointer bg-background-850 border border-border-focus text-text-blue shadow-md shadow-accent-sky hover:text-accent-sky hover:-translate-y-2 transition-all"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-0 -left-1/2 -z-10 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-accent-cyan/25 to-transparent animate-badge-sheen"
          />
          <Icon name="ai-chat" size="3xl" className="animate-pulse w-24! h-24! md:w-32! md:h-32! xl:w-44! xl:h-44!" />

          <Typography
            tag="span"
            className="text-14 md:text-16 xl:text-20 2xl:text-24 font-medium"
          >
            Ask AI
          </Typography>
        </button>
      )}

      {isOpen && (
        <div className="fixed z-50 inset-0 sm:inset-auto sm:bottom-24 sm:right-24 w-full h-dvh sm:w-[420px] md:w-[440px] sm:h-[min(700px,calc(100dvh-48px))]">
          <ChatWindowProvider>
            <ChatWindow
              closeWindow={() => setIsOpen(false)}
              // TODO:move it as well;
              emptyMessage="Start a conversation"
            />
          </ChatWindowProvider>
        </div>
      )}
    </>
  );
}
