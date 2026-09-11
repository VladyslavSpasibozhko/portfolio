import { Typography } from "@components/atoms/Typography";

interface TitleProps {
  content: string;
}

export function Title({ content }: TitleProps) {
  return (
    <Typography className="text-48 font-700 text-text-white">
      {content}
    </Typography>
  );
}
