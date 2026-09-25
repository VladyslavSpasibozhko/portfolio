import { Markdown } from "@components/molecules/Markdown";

interface ChatAssistantMessageProps {
  content: string;
  className?: string;
}

export function ChatAssistantMessage({
  content,
  className = "",
}: ChatAssistantMessageProps) {
  return (
    <div className={`flex gap-8 justify-self-start ${className}`}>
      <div className="flex-1">
        <div className="px-16 py-8 border border-border-strong rounded-lg text-white bg-background-900">
          <Markdown content={content} />
        </div>
      </div>
    </div>
  );
}
