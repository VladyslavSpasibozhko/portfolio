import { Timeline, type TimelineItem } from "@components/molecules/Timeline";
import { JourneySection } from "../JourneySection";
import { Title } from "../Title";
import { SubTitle } from "../SubTitle";
import { Story } from "../Story";

const timelineItems: TimelineItem[] = [
  { year: "2019", title: "Capital Holding", description: "Learned to build" },
  { year: "2020", title: "DataMix", description: "Learned to own" },
  { year: "2021", title: "REMED", description: "Learned to design" },
  { year: "2024", title: "WorkJam", description: "Learned to scale" },
  {
    year: "Today",
    title: "Looking ahead",
    description: "Building what's next",
  },
];

interface JourneyTimelineSlideProps {
  pageIndex: number;
}

export function JourneyTimelineSlide({ pageIndex }: JourneyTimelineSlideProps) {
  return (
    <JourneySection title="The Journey" current={pageIndex}>
      <div className="w-1/2 pt-20">
        <Title content="It didn't start with architecture." />
        <SubTitle className="pt-6" content="It started with learning how to make things work." />
        <Story
          className="pt-6"
          content="7+ years. Four companies. Different products. The same curiosity — how
          does it all fit together?"
        />
      </div>
      <div className="pt-20">
        <Timeline items={timelineItems} className="mt-24" />
      </div>
    </JourneySection>
  );
}
