import type { ReactNode } from "react";
import { Typography } from "@components/atoms/Typography";

interface StoryProps {
  content: ReactNode;
  className?: string;
}

export function Story({ content, className = "" }: StoryProps) {
  return (
    <Typography
      className={`text-16 md:text-14 lg:text-16 xl:text-20 2xl:text-24 text-text-sky ${className}`}
    >
      {content}
    </Typography>
  );
}
