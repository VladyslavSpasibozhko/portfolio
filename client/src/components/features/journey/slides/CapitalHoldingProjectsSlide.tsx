import { Badge } from "@components/atoms/Badge";
import { InfoCard } from "../InfoCard";
import { JourneySection } from "../JourneySection";
import { Title } from "../Title";
import { SubTitle } from "../SubTitle";
import { Story } from "../Story";
import { Typography } from "@components/atoms/Typography";

const badges = ["JavaScript", "React", "Redux"];

interface CapitalHoldingProjectsSlideProps {
  pageIndex: number;
}

export function CapitalHoldingProjectsSlide({ pageIndex }: CapitalHoldingProjectsSlideProps) {
  return (
    <JourneySection title="Capital Holding" current={pageIndex}>
      <div className="w-1/2 lg:w-2/3">
        <Title content="Where it all started." />
        <SubTitle
          className="mt-2 md:mt-4"
          content="Frontend Engineer · April 2019 – October 2020"
        />
        <Story
          className="mt-2 lg:mt-6"
          content="My first role as a frontend engineer. I was fascinated by how everything worked — not just the UI, but how data flows, how the frontend communicates with the backend, and how all the pieces work together."
        />
      </div>

      <div className="grid grid-cols-2 gap-2 md:gap-4 lg:gap-4 xl:gap-6 mt-4 md:mt-6 xl:mt-18">
        <InfoCard
          icon="javascript"
          title="Project 1 — Vanilla JavaScript"
          description="Built a sports betting platform from scratch. No frameworks, just JavaScript."
        >
          <Typography className="text-white text-10 sm:text-12 md:text-14 lg:text-16 xl:text-20 2xl:text-24">
            I learned what happens under the hood — how the application is
            structured, how data flows, how the UI updates, and how different
            parts interact.
          </Typography>
        </InfoCard>
        <InfoCard
          icon="react"
          title="Project 2 — React + Redux"
          description="The first project was replaced by a new one — this time with React and Redux."
        >
          <Typography className="text-white text-10 sm:text-12 md:text-14 lg:text-16 xl:text-20 2xl:text-24">
            I learned to understand more — why it worked, how Redux fit into the
            architecture, and how state should flow through the application.
          </Typography>
        </InfoCard>
      </div>

      <div className="flex justify-end gap-2 mt-2 sm:mt-4 md:mt-6 xl:mt-14 xl:justify-start">
        {badges.map((badge) => (
          <Badge
            key={badge}
            variant="primary"
            size="2xl"
            className="px-2 sm:px-4 md:px-6 lg:px-8"
          >
            {badge}
          </Badge>
        ))}
      </div>
    </JourneySection>
  );
}
