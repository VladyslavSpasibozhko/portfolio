import { Typography } from "@components/atoms/Typography";

interface HeadlineProps {
  content: string;
}

// Text wrapped in *asterisks* is accented, so the data file can highlight a
// word without carrying markup.
const ACCENTED_PART = /\*([^*]+)\*/g;

export function Headline({ content }: HeadlineProps) {
  const parts = content.split(ACCENTED_PART);

  return (
    <Typography className="text-34 sm:text-38 md:text-44 lg:text-50 xl:text-56 2xl:text-70 font-700 text-text-100">
      {parts.map((part, index) =>
        // split() puts every captured group at an odd position.
        index % 2 === 1 ? (
          <span key={part} className="text-accent-violet">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </Typography>
  );
}
