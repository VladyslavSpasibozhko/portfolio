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
      <div className="w-1/2 mt-6 sm:mt-8 md:mt-12 lg:mt-14 xl:mt-18">
        <Title content="It didn't start with architecture." />
        <SubTitle className="mt-2 md:mt-3 lg:mt-4" content="It started with learning how to make things work." />
        <Story
          className="mt-2 md:mt-3 lg:mt-4"
          content="7+ years. Four companies. Different products. The same curiosity — how
          does it all fit together?"
        />
      </div>
      <div className="mt-6 sm:mt-8 md:mt-12 lg:mt-14 xl:mt-18">
        <Timeline items={timelineItems} className="mt-8 sm:mt-10 md:mt-14 lg:mt-18 xl:mt-22" />
      </div>
    </JourneySection>
  );
}
