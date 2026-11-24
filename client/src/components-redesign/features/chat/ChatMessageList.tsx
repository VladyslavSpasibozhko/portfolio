import { useEffect, useRef, type ReactNode } from "react";

interface ChatMessageListProps {
  scrollKey: string;
  children: ReactNode;
}

export function ChatMessageList({ scrollKey, children }: ChatMessageListProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    element.scrollTop = element.scrollHeight;
  }, [scrollKey]);

  return (
    <div
      ref={ref}
      role="log"
      aria-live="polite"
      className="flex-1 flex flex-col min-h-0 overflow-y-auto"
    >
      <div className="mt-auto flex flex-col gap-12">{children}</div>
    </div>
  );
}
