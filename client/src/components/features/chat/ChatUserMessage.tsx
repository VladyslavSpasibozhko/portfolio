import { Avatar } from "@components/atoms/Avatar";
import { Typography } from "@components/atoms/Typography";

interface ChatUserMessageProps {
  content: string;
  username: string;
  className?: string;
}

export function ChatUserMessage({ content, username, className = "" }: ChatUserMessageProps) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <Avatar initials={username.slice(0, 2).toUpperCase()} size="sm" />
      <div className="flex-1">
        <Typography tag="small" className="text-gray-400 block mb-1">
          {username}
        </Typography>
        <div className="bg-white/5 border border-white/10 backdrop-blur-sm text-gray-100 px-4 py-2 rounded-lg">
          <Typography tag="span" className="text-gray-100">
            {content}
          </Typography>
        </div>
      </div>
    </div>
  );
}
