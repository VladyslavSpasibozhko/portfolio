import { useEffect, useState } from "react";
import { IconButton } from "@components/molecules/IconButton";
import { Textarea } from "@components/atoms/Textarea";
import { useChatWindowContext } from "./context/ChatWindowContext";
import type { StatusChangeEvent, StreamStatus } from "./utils/statusEmitter";

export function ChatInput() {
  const [input, setInput] = useState("");
  const { sendMessage, statusEmitter } = useChatWindowContext();
  const [isDisabled, setIsDisabled] = useState(false);

  const submit = () => {
    if (!input.trim()) return;

    sendMessage(input);
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("hello");
    e.preventDefault();
    submit();
  };

  const handleEnterKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  useEffect(() => {
    const handleChange = (event: Event) => {
      const status = (event as StatusChangeEvent).detail;
      const statuses: StreamStatus[] = ["generating", "waiting"];
      setIsDisabled(statuses.includes(status));
    };

    statusEmitter.addEventListener("change", handleChange);
    return () => statusEmitter.removeEventListener("change", handleChange);
  }, [statusEmitter]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-8 p-16 border-t border-border-focus"
    >
      <Textarea
        name="chat_message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleEnterKeyDown}
        disabled={isDisabled}
        placeholder="Type a message..."
        className="flex-1"
        autoResize
        autoFocus
        maxHeight={200}
      />
      <IconButton
        icon="send"
        variant="primary"
        size="xl"
        type="submit"
        disabled={isDisabled || !input.trim()}
        aria-label="Send message"
      />
    </form>
  );
}
