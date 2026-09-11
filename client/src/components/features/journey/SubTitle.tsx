import { Typography } from "@components/atoms/Typography";

interface SubTitleProps {
  content: string;
  className?: string;
}

export function SubTitle({ content, className = "" }: SubTitleProps) {
  return (
    <Typography className={`text-32 text-text-100 ${className}`}>
      {content}
    </Typography>
  );
}
