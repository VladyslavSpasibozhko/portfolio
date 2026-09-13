import type { JourneyTextBlock } from "@types";
import { Story } from "../Story";
import { Quote } from "../Quote";
import { BlockHeading } from "../BlockHeading";

interface TextBlockProps {
  block: JourneyTextBlock;
}

export function TextBlock({ block }: TextBlockProps) {
  return (
    <div className="space-y-2 md:space-y-3.5 xl:space-y-12">
      <BlockHeading content={block.heading} />
      {block.paragraphs.map((paragraph) => (
        <Story key={paragraph} content={paragraph} />
      ))}
      {block.quote && <Quote content={block.quote} />}
    </div>
  );
}
