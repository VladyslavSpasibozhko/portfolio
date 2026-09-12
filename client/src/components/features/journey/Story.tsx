import type { ReactNode } from "react";
import { Typography } from "@components/atoms/Typography";

interface StoryProps {
  content: ReactNode;
  className?: string;
}

export function Story({ content, className = "" }: StoryProps) {
  return (
    <Typography
      className={`text-12 sm:text-14 md:text-16 lg:text-18 xl:text-20 2xl:text-24 text-text-sky ${className}`}
    >
      {content}
    </Typography>
  );
}
