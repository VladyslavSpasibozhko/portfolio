import { useEffect, useState } from "react";
import type { WsMessage } from "@types";
import { config } from "@config";
import { IconButton } from "@components/molecules/IconButton";
import { ChatWindow } from "./ChatWindow";
import { useChatConnection } from "./hooks/useChatConnection";
import { messageFactory } from "./utils/messageFactory";

interface ChatWrapperProps {
  avatarUrl?: string;
  username?: string;
}

export function ChatWrapper({}: ChatWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const [messages, setMessages] = useState<WsMessage[]>([]);
  const connection = useChatConnection({ url: config.wsUrl });

  const handleSending = () => {
    setIsResponding(true);

    const unsubscribe = connection.subscribe(() => {
      setIsResponding(false);
      unsubscribe();
    });
  };

  const handleSendMessage = (content: string) => {
    const success = connection.send(content);
    if (success) {
      setMessages((state) => state.concat(messageFactory(content)));
      handleSending();
    }
  };

  const connect = async (signal: AbortSignal) => {
    try {
      const connected = await connection.initialize({ signal });
      if (!connected) throw Error("Can`t connect");

      connection.subscribe((response) => {
        if (!response.success) return;
        setMessages((state) => state.concat(response.message));
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    connect(abortController.signal);

    return () => {
      abortController.abort("Close connection due component unmount.");
    };
  }, []);

  return (
    <>
      <IconButton
        icon="ai-chat"
        variant="primary"
        size="4xl"
        className="fixed z-10 bottom-5 right-5"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat"
      />

      {isOpen && (
        <div className="fixed z-40 top-0 left-0 right-0 bottom-0 bg-black/20 backdrop-blur-sm">
          <div className="fixed bottom-5 right-5 z-50 w-full h-screen max-h-200 sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
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
