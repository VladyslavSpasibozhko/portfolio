import { useState } from "react";
import { IconButton } from "@components/molecules/IconButton";
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
            <ChatWindowProvider>
              <ChatWindow
                closeWindow={() => setIsOpen(false)}
                // TODO:move it as well;
                emptyMessage="Start a conversation"
              />
            </ChatWindowProvider>
          </div>
        </div>
      )}
    </>
  );
}
