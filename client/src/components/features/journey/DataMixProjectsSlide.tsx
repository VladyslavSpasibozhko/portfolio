import { Typography } from "@components/atoms/Typography";
import { Icon } from "@components/atoms/Icon";
import { InfoCard } from "./InfoCard";
import { JourneySection } from "./JourneySection";

export function DataMixProjectsSlide() {
  return (
    <JourneySection title="DataMix" current={7}>
      <Typography tag="h1">The projects.</Typography>

      <div className="grid grid-cols-2 gap-6 mt-10 w-2/3">
        <InfoCard
          title="Investment Matching Platform"
          description="High-load two-sided marketplace with complex data and matching logic. Focused on performance, scalability and user responsiveness."
          badges={["React", "Redux-Saga", "GraphQL"]}
        />
        <InfoCard
          title="Social Network (MVP)"
          description="Built from scratch in 6 months. Architecture, state, data fetching, UI, animations, deployment — all on me."
          badges={["React", "Redux", "Firebase"]}
        />
      </div>

      <div className="flex items-center gap-3 mt-10 p-6 rounded-lg border border-border-focus bg-background-700 w-2/3">
        <Icon name="code" size="sm" className="text-text-sky" />
        <Typography tag="p" className="italic text-text-300">
          I wasn't just implementing features anymore. I was thinking about
          the whole system.
        </Typography>
      </div>
    </JourneySection>
  );
}
