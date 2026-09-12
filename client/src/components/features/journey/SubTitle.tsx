import { Typography } from "@components/atoms/Typography";

interface SubTitleProps {
  content: string;
  className?: string;
}

export function SubTitle({ content, className = "" }: SubTitleProps) {
  return (
    <Typography
      className={`text-16 sm:text-18 md:text-20 lg:text-24 xl:text-26 2xl:text-32 text-text-100 ${className}`}
    >
      {content}
    </Typography>
  );
}
