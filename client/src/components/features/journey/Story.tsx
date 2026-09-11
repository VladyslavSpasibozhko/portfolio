import type { ReactNode } from "react";
import { Typography } from "@components/atoms/Typography";

interface StoryProps {
  content: ReactNode;
  className?: string;
}

export function Story({ content, className = "" }: StoryProps) {
  return (
    <Typography className={`text-24 text-text-sky ${className}`}>
      {content}
    </Typography>
  );
}
