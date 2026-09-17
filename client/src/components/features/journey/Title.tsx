import { Typography } from "@components/atoms/Typography";

interface TitleProps {
  content: string;
}

export function Title({ content }: TitleProps) {
  return (
    <Typography
      tag="h2"
      className="leading-relaxed text-20 sm:text-22 md:text-26 lg:text-30 xl:text-34 2xl:text-40 3xl:text-48 font-700 text-text-white"
    >
      {content}
    </Typography>
  );
}
