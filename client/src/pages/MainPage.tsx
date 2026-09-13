import type { JourneyData } from "@types";
import { JourneySlide } from "@components/features/journey/JourneySlide";
import journeyData from "@data/journey.json";

const sections = journeyData as JourneyData;

export function MainPage() {
  return (
    <main>
      {sections.map((section, index) => (
        <JourneySlide
          key={section.id}
          section={section}
          current={index + 1}
          max={sections.length}
          showFooter={index < sections.length - 1}
        />
      ))}
    </main>
  );
}
