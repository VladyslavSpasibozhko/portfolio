import type { ReactNode } from "react";

interface ChatContainerProps {
  children: ReactNode;
}

export function ChatContainer({ children }: ChatContainerProps) {
  return (
    <div className="flex flex-col gap-12 h-[420px] tablet:h-[480px] p-12 rounded-10 bg-bg-surface">
      {children}
    </div>
  );
}
