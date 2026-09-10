import { Typography } from "@components/atoms/Typography";
import { Markdown } from "@components/molecules/Markdown";

interface ChatAssistantMessageProps {
  content: string;
  username: string;
  className?: string;
}

export function ChatAssistantMessage({ content, username, className = "" }: ChatAssistantMessageProps) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <div className="flex-1">
        <Typography tag="span" className="block mb-1">
          {username}
        </Typography>
        <div className="border backdrop-blur-sm px-4 py-2 rounded-lg">
          <Markdown content={content} />
        </div>
      </div>
    </div>
  );
}
