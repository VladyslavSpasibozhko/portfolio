import { useState } from "react";
import { ChatContainer } from "./ChatContainer";
import { ChatMessageList } from "./ChatMessageList";
import { ChatMessage } from "./ChatMessage";
import { ChatLoading } from "./ChatLoading";
import { ChatError } from "./ChatError";
import { ChatTextField } from "./ChatTextField";
import { useChatMessages } from "./hooks/useChatMessages";
import { useStreamStatus } from "./hooks/useStreamStatus";
import { useStreamContent } from "./hooks/useStreamContent";
import type { StreamStatus } from "./utils/statusEmitter";
import { translate } from "@lib/i18n";

const BUSY_STATUSES = new Set<StreamStatus>(["waiting", "generating"]);

// TODO: review stream and status emitters.
// TODO: move input to text component.
// TODO: messages key.
export function Chat() {
  const [input, setInput] = useState("");
  const { messages, statusEmitter, streamEmitter, error, sendMessage, retrySendMessage } =
    useChatMessages();
  const status = useStreamStatus(statusEmitter);
  const streamContent = useStreamContent(streamEmitter);

  const isWaiting = status === "waiting";
  const isBusy = BUSY_STATUSES.has(status);

  const send = () => {
    sendMessage(input.trim());
    setInput("");
  };

  return (
    <ChatContainer>
      <ChatMessageList scrollKey={`${messages.length}-${streamContent.length}-${status}`}>
        <ChatMessage role="assistant">{translate("chat.greeting")}</ChatMessage>
        {messages.map((message, index) => (
          <ChatMessage key={index} role={message.role}>
            {message.content}
          </ChatMessage>
        ))}
        {streamContent && <ChatMessage role="assistant">{streamContent}</ChatMessage>}
        {isWaiting && <ChatLoading />}
        {error && <ChatError message={translate(error)} onRetry={retrySendMessage} />}
      </ChatMessageList>
      <ChatTextField value={input} onChange={setInput} onSubmit={send} disabled={isBusy} />
    </ChatContainer>
  );
}
