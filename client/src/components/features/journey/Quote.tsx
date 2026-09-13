import { Typography } from "@components/atoms/Typography";

interface QuoteProps {
  content: string;
  className?: string;
}

export function Quote({ content, className = "" }: QuoteProps) {
  return (
    <Typography
      tag="p"
      className={`border-l-2 lg:border-l-4 border-border-focus pl-4 text-14 sm:text-16 md:text-18 lg:text-20 xl:text-22 2xl:text-26 font-500 text-text-100 ${className}`}
    >
      {content}
    </Typography>
  );
}
