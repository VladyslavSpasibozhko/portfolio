import { Typography } from "@components/atoms/Typography";

interface TitleProps {
  content: string;
}

export function Title({ content }: TitleProps) {
  return (
    <Typography
      tag="h2"
      className="leading-relaxed text-22 sm:text-26 md:text-28 lg:text-32 xl:text-38 2xl:text-48 font-700 text-text-white"
    >
      {content}
    </Typography>
  );
}
