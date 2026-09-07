import { useEffect, useState } from "react";
import type { WsMessage } from "@types";
import { config } from "@lib/config";
import { Icon } from "@components/atoms/Icon";
import { Button } from "@components/atoms/Button";
import { ChatWindow } from "./ChatWindow";
import { useChatConnection } from "./hooks/useChatConnection";

interface ChatWrapperProps {
  avatarUrl?: string;
  username?: string;
}

const messageFactory = (content: string): WsMessage => {
  return {
    role: "user",
    content,
  };
};

export function ChatWrapper({}: ChatWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<WsMessage[]>([]);
  const connection = useChatConnection({ url: config.wsUrl });

  const handleSendMessage = (content: string) => {
    const success = connection.send(content);
    if (success) {
      setMessages((state) => state.concat(messageFactory(content)));
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
      <Button
        className="fixed z-10 bottom-5 right-5"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat"
      >
        <Icon name="ai-chat" size="lg" />
      </Button>

      {isOpen && (
        <div className="fixed z-40 top-0 left-0 right-0 bottom-0 bg-black/20 backdrop-blur-sm">
          <div className="fixed bottom-5 right-5 z-50 w-full h-screen max-h-200 sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
            <ChatWindow
              messages={messages}
              closeWindow={() => setIsOpen(false)}
              sendMessage={handleSendMessage}
              emptyMessage="Start a conversation"
            />
          </div>
        </div>
      )}
    </>
  );
}
