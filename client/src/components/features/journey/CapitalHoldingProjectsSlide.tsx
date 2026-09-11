import { Typography } from "@components/atoms/Typography";
import { Badge } from "@components/atoms/Badge";
import { InfoCard } from "./InfoCard";
import { JourneySection } from "./JourneySection";

export function CapitalHoldingProjectsSlide() {
  return (
    <JourneySection title="Capital Holding" current={3}>
      <div className="w-2/3 space-y-4">
        <Typography tag="h1">Where it all started.</Typography>
        <Typography tag="small" className="text-text-400">
          Frontend Engineer · April 2019 – October 2020
        </Typography>
        <Typography tag="p" className="text-text-300">
          My first role as a frontend engineer. I was fascinated by how
          everything worked — not just the UI, but how data flows, how the
          frontend communicates with the backend, and how all the pieces work
          together.
        </Typography>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-10 w-2/3">
        <InfoCard
          icon="info"
          title="Project 1 — Vanilla JavaScript"
          description="Built a sports betting platform from scratch. No frameworks, just JavaScript."
        />
        <InfoCard
          icon="info"
          title="Project 2 — React + Redux"
          description="The first project was replaced by a new one — this time with React and Redux."
        />
      </div>

      <div className="flex gap-3 mt-8">
        <Badge>JavaScript</Badge>
        <Badge>React</Badge>
        <Badge>Redux</Badge>
      </div>
    </JourneySection>
  );
}
