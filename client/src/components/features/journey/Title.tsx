import { Typography } from "@components/atoms/Typography";

interface TitleProps {
  content: string;
}

export function Title({ content }: TitleProps) {
  return (
    <Typography className="text-22 sm:text-26 md:text-30 lg:text-34 xl:text-38 2xl:text-48 font-700 text-text-white">
      {content}
    </Typography>
  );
}
