import { InfoCard } from "../InfoCard";
import { JourneySection } from "../JourneySection";
import { Title } from "../Title";
import { BadgeRow } from "../BadgeRow";

interface WorkJamProblemsSlideProps {
  pageIndex: number;
}

export function WorkJamProblemsSlide({ pageIndex }: WorkJamProblemsSlideProps) {
  return (
    <JourneySection title="WorkJam" current={pageIndex}>
      <Title content="Four complex problems. Real solutions." />

      <div className="grid grid-cols-2 gap-2 md:gap-4 mt-2 sm:mt-4 md:mt-6 lg:mt-8">
        <InfoCard
          icon="feature-flag"
          title="Feature Flag Migration"
          description="LaunchDarkly + Flagr → Harness. Zero downtime, no disruption."
          className="bg-transparent"
        >
          <BadgeRow badges={["Harness", "Feature Flags", "CI/CD"]} />
        </InfoCard>
        <InfoCard
          icon="modular-book"
          title="Microsoft Teams Integration"
          description="Four apps + unified experience. Context, navigation, reuse."
          className="bg-transparent"
        >
          <BadgeRow badges={["Teams", "Micro-frontends"]} />
        </InfoCard>
        <InfoCard
          icon="terminal"
          title="Android WebView"
          description="Web chat in native app. JS ↔ Native bridge."
          className="bg-transparent"
        >
          <BadgeRow badges={["Android", "WebView", "JavaScript"]} />
        </InfoCard>
        <InfoCard
          icon="calendar-cursor"
          title="Calendar (Agenda View)"
          description="Infinite scroll, search, filters, date picker. Built in 10 days."
          className="bg-transparent"
        >
          <BadgeRow badges={["React", "Performance", "UX"]} />
        </InfoCard>
      </div>
    </JourneySection>
  );
}
