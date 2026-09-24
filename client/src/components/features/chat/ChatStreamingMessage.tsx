import { useEffect, useState } from "react";
import { ChatAssistantMessage } from "./ChatAssistantMessage";
import { useChatWindowContext } from "./context/ChatWindowContext";

interface ChatStreamingMessageProps {}

export function ChatStreamingMessage(props: ChatStreamingMessageProps) {
  const { streamEmitter } = useChatWindowContext();
  const [content, setContent] = useState(streamEmitter.content);

  useEffect(() => {
    const handleDelta = () => setContent(streamEmitter.content);
    const reset = () => setContent("");

    streamEmitter.addEventListener("delta", handleDelta);
    streamEmitter.addEventListener("done", reset);
    streamEmitter.addEventListener("error", reset);

    return () => {
      streamEmitter.removeEventListener("delta", handleDelta);
      streamEmitter.removeEventListener("done", reset);
      streamEmitter.removeEventListener("error", reset);
    };
  }, [streamEmitter]);

  if (!content) return null;

  return <ChatAssistantMessage content={content} />;
}
