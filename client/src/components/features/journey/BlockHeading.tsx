import { Typography } from "@components/atoms/Typography";

interface BlockHeadingProps {
  content?: string;
}

export function BlockHeading({ content }: BlockHeadingProps) {
  if (!content) return null;

  return (
    <Typography
      tag="h3"
      className="uppercase text-14 lg:text-16 xl:text-18 text-text-100"
    >
      {content}
    </Typography>
  );
}
