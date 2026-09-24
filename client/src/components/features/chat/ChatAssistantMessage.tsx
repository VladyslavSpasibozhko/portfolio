import { Typography } from "@components/atoms/Typography";
import { Markdown } from "@components/molecules/Markdown";

interface ChatAssistantMessageProps {
  content: string;
  username: string;
  className?: string;
}

export function ChatAssistantMessage({ content, username, className = "" }: ChatAssistantMessageProps) {
  return (
    <div className={`flex gap-8 justify-self-start ${className}`}>
      <div className="flex-1">
        <Typography tag="span" className="text-text-sky block mb-4">
          {username}
        </Typography>
        <div className="px-16 py-8 rounded-lg text-white bg-background-850 shadow-sm shadow-accent-blue">
          <Markdown content={content} />
        </div>
      </div>
    </div>
  );
}
