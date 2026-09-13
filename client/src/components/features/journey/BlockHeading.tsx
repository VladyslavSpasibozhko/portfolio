import { Typography } from "@components/atoms/Typography";

interface BlockHeadingProps {
  content?: string;
}

export function BlockHeading({ content }: BlockHeadingProps) {
  if (!content) return null;

  return (
    <Typography
      tag="h4"
      className="uppercase text-10 sm:text-12 md:text-14 lg:text-16 xl:text-18 text-text-100"
    >
      {content}
    </Typography>
  );
}
