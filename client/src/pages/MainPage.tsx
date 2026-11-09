import type { journeyTypes } from "@portfolio/shared/types";
import { JourneySlide } from "@components/features/journey/JourneySlide";
import journeyData from "@portfolio/shared/data/journey.json";

const sections = journeyData as journeyTypes.JourneyData;

export function MainPage() {
  return (
    <main className="bg-background-950/60">
      {sections.map((section, index) => (
        <JourneySlide
          key={section.id}
          section={section}
          current={index + 1}
          max={sections.length}
        />
      ))}
    </main>
  );
}
