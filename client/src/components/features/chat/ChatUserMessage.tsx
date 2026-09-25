import { Typography } from "@components/atoms/Typography";

interface ChatUserMessageProps {
  content: string;
  className?: string;
}

export function ChatUserMessage({
  content,
  className = "",
}: ChatUserMessageProps) {
  return (
    <div
      className={`flex gap-8 flex-row-reverse justify-self-end ${className}`}
    >
      <div className="flex-1">
        <div className="border border-border-highlight backdrop-blur-sm px-16 py-8 rounded-lg bg-background-700">
          <Typography tag="span" className="break-all text-white">
            {content}
          </Typography>
        </div>
      </div>
    </div>
  );
}
