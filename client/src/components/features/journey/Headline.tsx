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
    // Only the opening slide has a headline, so it's the page's single h1.
    <Typography
      tag="h1"
      className="leading-relaxed text-28 sm:text-32 md:text-34 lg:text-36 xl:text-40 2xl:text-56 font-700 text-text-100"
    >
      {parts.map((part, index) =>
        // split() puts every captured group at an odd position.
        index % 2 === 1 ? (
          <span key={part} className="text-accent-violet">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </Typography>
  );
}
