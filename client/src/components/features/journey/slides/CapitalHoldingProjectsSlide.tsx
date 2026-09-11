import { Badge } from "@components/atoms/Badge";
import { InfoCard } from "../InfoCard";
import { JourneySection } from "../JourneySection";
import { Title } from "../Title";
import { SubTitle } from "../SubTitle";
import { Story } from "../Story";
import { Typography } from "@components/atoms/Typography";

const badges = ["JavaScript", "React", "Redux"];

export function CapitalHoldingProjectsSlide() {
  return (
    <JourneySection title="Capital Holding" current={3}>
      <div className="w-1/2">
        <Title content="Where it all started." />
        <SubTitle
          className="pt-6"
          content="Frontend Engineer · April 2019 – October 2020"
        />
        <Story
          className="pt-12"
          content="My first role as a frontend engineer. I was fascinated by how everything worked — not just the UI, but how data flows, how the frontend communicates with the backend, and how all the pieces work together."
        />
      </div>

      <div className="grid grid-cols-2 gap-8 pt-20">
        <InfoCard
          icon="javascript"
          title="Project 1 — Vanilla JavaScript"
          description="Built a sports betting platform from scratch. No frameworks, just JavaScript."
        >
          <Typography className="text-white text-24">
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
          <Typography className="text-white text-24">
            I learned to understand more — why it worked, how Redux fit into the
            architecture, and how state should flow through the application.
          </Typography>
        </InfoCard>
      </div>

      <div className="flex gap-4 pt-20">
        {badges.map((badge) => (
          <Badge key={badge} variant="primary" size="2xl" className="px-10">
            {badge}
          </Badge>
        ))}
      </div>
    </JourneySection>
  );
}
