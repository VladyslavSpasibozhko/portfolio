import { useState } from "react";
import { Button } from "@components/atoms/Button";
import { Icon } from "@components/atoms/Icon";
import { Textarea } from "@components/atoms/Textarea";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState("");

  const submit = () => {
    if (!input.trim()) return;

    onSendMessage(input);
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

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 p-4  bg-gray-600/30"
    >
      <Textarea
        name="chat_message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleEnterKeyDown}
        disabled={disabled}
        placeholder="Type a message..."
        className="flex-1"
        autoResize
        autoFocus
        maxHeight={200}
      />
      <Button
        variant="primary"
        size="md"
        type="submit"
        disabled={disabled || !input.trim()}
        aria-label="Send message"
      >
        <Icon name="send" size="md" />
      </Button>
    </form>
  );
}
