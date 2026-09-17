import type { ReactNode } from "react";
import { Typography } from "@components/atoms/Typography";

interface StoryProps {
  content: ReactNode;
  className?: string;
}

export function Story({ content, className = "" }: StoryProps) {
  return (
    <Typography
      className={`text-10 md:text-12 lg:text-14 xl:text-26 2xl:text-20 3xl:text-26 text-text-sky ${className}`}
    >
      {content}
    </Typography>
  );
}
