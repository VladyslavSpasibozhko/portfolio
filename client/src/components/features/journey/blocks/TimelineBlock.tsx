import type { JourneyTimelineBlock } from "@global-types/journey";
import { Timeline } from "@components/molecules/Timeline";
import { BlockHeading } from "../BlockHeading";

interface TimelineBlockProps {
  block: JourneyTimelineBlock;
}

export function TimelineBlock({ block }: TimelineBlockProps) {
  return (
    <div className="space-y-16 md:space-y-30 xl:space-y-32">
      <BlockHeading content={block.heading} />
      <Timeline items={block.items} />
    </div>
  );
}
