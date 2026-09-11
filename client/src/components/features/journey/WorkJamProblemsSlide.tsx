import { Typography } from "@components/atoms/Typography";
import { InfoCard } from "./InfoCard";
import { JourneySection } from "./JourneySection";

export function WorkJamProblemsSlide() {
  return (
    <JourneySection title="WorkJam" current={11}>
      <Typography tag="h1">Four complex problems. Real solutions.</Typography>

      <div className="grid grid-cols-2 gap-6 mt-10 w-2/3">
        <InfoCard
          icon="feature-flag"
          title="Feature Flag Migration"
          description="LaunchDarkly + Flagr → Harness. Zero downtime, no disruption."
          badges={["Harness", "Feature Flags", "CI/CD"]}
        />
        <InfoCard
          icon="ai-chat"
          title="Microsoft Teams Integration"
          description="Four apps + unified experience. Context, navigation, reuse."
          badges={["Teams", "Micro-frontends"]}
        />
        <InfoCard
          icon="terminal"
          title="Android WebView"
          description="Web chat in native app. JS ↔ Native bridge."
          badges={["Android", "WebView", "JavaScript"]}
        />
        <InfoCard
          icon="calendar-cursor"
          title="Calendar (Agenda View)"
          description="Infinite scroll, search, filters, date picker. Built in 10 days."
          badges={["React", "Performance", "UX"]}
        />
      </div>
    </JourneySection>
  );
}
