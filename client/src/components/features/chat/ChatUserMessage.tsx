import { Typography } from "@components/atoms/Typography";

interface ChatUserMessageProps {
  content: string;
  username: string;
  className?: string;
}

export function ChatUserMessage({ content, username, className = "" }: ChatUserMessageProps) {
  return (
    <div className={`flex gap-2 flex-row-reverse justify-self-end ${className}`}>
      <div className="flex-1">
        <Typography tag="span" className="text-right block mb-1">
          {username}
        </Typography>
        <div className="border backdrop-blur-sm px-4 py-2 rounded-lg">
          <Typography tag="span" className="break-all">
            {content}
          </Typography>
        </div>
      </div>
    </div>
  );
}
