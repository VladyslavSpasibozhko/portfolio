import type { ReactNode } from "react";
import { Typography } from "@components/atoms/Typography";

export type ChatMessageRole = "user" | "assistant" | "error";

interface ChatMessageProps {
  role: ChatMessageRole;
  children: ReactNode;
}

const ROLE_CLASSES: Record<ChatMessageRole, string> = {
  user: "self-end bg-bg-userBubble",
  assistant: "self-start bg-bg-assistantBubble",
  error: "self-start bg-bg-errorBubble",
};

const ROLE_TONES = {
  user: "primary",
  assistant: "primary",
  error: "error",
} as const;

export function ChatMessage({ role, children }: ChatMessageProps) {
  return (
    <div className={`max-w-4/5 px-12 py-8 rounded-8 ${ROLE_CLASSES[role]}`}>
      <Typography
        variant="small"
        tag="span"
        className="whitespace-pre-wrap"
        tone={ROLE_TONES[role]}
        weight="medium"
      >
        {children}
      </Typography>
    </div>
  );
}
