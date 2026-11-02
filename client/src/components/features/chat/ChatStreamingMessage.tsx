import { useEffect, useState } from "react";
import { ChatAssistantMessage } from "./ChatAssistantMessage";
import { useChatWindowContext } from "./context/ChatWindowContext";

export function ChatStreamingMessage() {
  const { streamEmitter } = useChatWindowContext();
  const [content, setContent] = useState(streamEmitter.content);

  useEffect(
    () => streamEmitter.subscribe(() => setContent(streamEmitter.content)),
    [streamEmitter],
  );

  if (!content) return null;

  return <ChatAssistantMessage content={content} />;
}
