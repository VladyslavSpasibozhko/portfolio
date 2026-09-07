import { useState } from 'react';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { Textarea } from '../../atoms/Textarea';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 p-4  bg-gray-600/30">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
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
