import { Typography } from "@components/atoms/Typography";

interface ChatUserMessageProps {
  content: string;
  username: string;
  className?: string;
}

export function ChatUserMessage({ content, username, className = "" }: ChatUserMessageProps) {
  return (
    <div
      className={`flex gap-8 flex-row-reverse justify-self-end ${className}`}
    >
      <div className="flex-1">
        <Typography tag="span" className="text-text-sky text-right block mb-4">
          {username}
        </Typography>
        <div className="border backdrop-blur-sm px-16 py-8 rounded-lg bg-background-850 shadow-sm shadow-accent-blue">
          <Typography tag="span" className="break-all text-white">
            {content}
          </Typography>
        </div>
      </div>
    </div>
  );
}
