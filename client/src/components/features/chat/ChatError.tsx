import { Button } from "@components/atoms/Button";
import { ChatMessage } from "./ChatMessage";
import { translate } from "@lib/i18n";

interface ChatErrorProps {
  message: string;
  onRetry: () => void;
}

export function ChatError({ message, onRetry }: ChatErrorProps) {
  return (
    <div className="self-start flex items-center gap-8">
      <ChatMessage role="error">{message}</ChatMessage>
      <Button variant="ghost" size="sm" onClick={onRetry}>
        {translate("chat.retry")}
      </Button>
    </div>
  );
}
