import type { JourneyTimelineBlock } from "@types";
import { Timeline } from "@components/molecules/Timeline";
import { BlockHeading } from "../BlockHeading";

interface TimelineBlockProps {
  block: JourneyTimelineBlock;
}

export function TimelineBlock({ block }: TimelineBlockProps) {
  return (
    <div className="space-y-4 md:space-y-7.5 xl:space-y-8">
      <BlockHeading content={block.heading} />
      <Timeline items={block.items} />
    </div>
  );
}
