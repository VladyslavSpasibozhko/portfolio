import { Typography } from "@components/atoms/Typography";
import { Timeline, type TimelineItem } from "@components/molecules/Timeline";
import { JourneySection } from "./JourneySection";

const timelineItems: TimelineItem[] = [
  { year: "2019", title: "Capital Holding", description: "Learned to build" },
  { year: "2020", title: "DataMix", description: "Learned to own" },
  { year: "2021", title: "REMED", description: "Learned to design" },
  { year: "2024", title: "WorkJam", description: "Learned to scale" },
  { year: "Today", title: "Looking ahead", description: "Building what's next" },
];

export function JourneyTimelineSlide() {
  return (
    <JourneySection title="The Journey" current={2}>
      <div className="w-2/3 space-y-6">
        <Typography tag="h1">It didn't start with architecture.</Typography>
        <Typography tag="p" className="text-text-300">
          It started with learning how to make things work.
        </Typography>
        <Typography tag="p" className="text-text-blue">
          7+ years. Four companies. Different products. The same curiosity —
          how does it all fit together?
        </Typography>
      </div>
      <Timeline items={timelineItems} className="mt-24" />
    </JourneySection>
  );
}
