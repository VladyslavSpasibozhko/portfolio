import { Typography } from "@components/atoms/Typography";
import { Icon } from "@components/atoms/Icon";
import { InfoCard } from "../InfoCard";
import { JourneySection } from "../JourneySection";
import { Title } from "../Title";
import { BadgeRow } from "../BadgeRow";
import { BorderedContainer } from "@components/atoms/BorderedContainer";

interface DataMixProjectsSlideProps {
  pageIndex: number;
}

export function DataMixProjectsSlide({ pageIndex }: DataMixProjectsSlideProps) {
  return (
    <JourneySection title="DataMix" current={pageIndex}>
      <Title content="The projects." />

      <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-8 lg:gap-12 xl:gap-14 mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14 w-full">
        <InfoCard
          title="Investment Matching Platform"
          description="High-load two-sided marketplace with complex data and matching logic. Focused on performance, scalability and user responsiveness."
        >
          <BadgeRow badges={["React", "Redux-Saga", "GraphQL"]} />
        </InfoCard>
        <InfoCard
          title="Social Network (MVP)"
          description="Built from scratch in 6 months. Architecture, state, data fetching, UI, animations, deployment — all on me."
        >
          <BadgeRow badges={["React", "Redux", "Firebase"]} />
        </InfoCard>
      </div>

      <BorderedContainer className=" w-full mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14 flex items-center">
        <div className="mr-2">
          <Icon name="code" size="5xl" className="text-text-sky" />
        </div>
        <Typography tag="p" className="italic text-12 md:text-18 xl:text-22 2xl:text-30 text-text-300">
          I wasn't just implementing features anymore. I was thinking about the
          whole system.
        </Typography>
      </BorderedContainer>
    </JourneySection>
  );
}
