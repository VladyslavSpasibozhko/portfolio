import { Typography } from "@components/atoms/Typography";

interface QuoteProps {
  content: string;
  className?: string;
}

export function Quote({ content, className = "" }: QuoteProps) {
  return (
    <Typography
      tag="p"
      className={`border-l-2 lg:border-l-4 border-border-focus pl-16 md:pl-14 xl:pl-16 text-12 md:text-16 xl:text-18 2xl:text-24 3xl:text-32 font-500 text-text-100 ${className}`}
    >
      {content}
    </Typography>
  );
}
