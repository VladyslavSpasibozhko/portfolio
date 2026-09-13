import type { JourneyStatsBlock } from "@types";
import { BorderedContainer } from "@components/atoms/BorderedContainer";
import { Typography } from "@components/atoms/Typography";
import { BlockHeading } from "../BlockHeading";

interface StatsBlockProps {
  block: JourneyStatsBlock;
}

export function StatsBlock({ block }: StatsBlockProps) {
  return (
    <div className="space-y-2 md:space-y-4">
      <BlockHeading content={block.heading} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-4">
        {block.items.map((item) => (
          <BorderedContainer className="bg-transparent" key={item}>
            <Typography
              tag="p"
              className="text-10 sm:text-12 md:text-14 lg:text-16 text-text-white"
            >
              {item}
            </Typography>
          </BorderedContainer>
        ))}
      </div>
    </div>
  );
}
