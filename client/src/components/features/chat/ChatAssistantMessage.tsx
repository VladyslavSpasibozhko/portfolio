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
        <Typography tag="span" className="text-gray-400 block mb-1">
          {username}
        </Typography>
        <div className="bg-white/5 border border-white/10 backdrop-blur-sm text-gray-100 px-4 py-2 rounded-lg">
          <Markdown content={content} />
        </div>
      </div>
    </div>
  );
}
