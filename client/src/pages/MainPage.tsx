import type { JourneyData } from "@types";
import { Slider, type Slide } from "@components/molecules/Slider";
import { JourneySlide } from "@components/features/journey/JourneySlide";
import journeyData from "@data/journey.json";

const sections = journeyData as JourneyData;

const slides: Slide[] = sections.map((section, index) => ({
  id: section.id,
  content: (
    <JourneySlide
      section={section}
      current={index + 1}
      max={sections.length}
      showFooter={index < sections.length - 1}
    />
  ),
}));

export function MainPage() {
  return (
    <main>
      <Slider slides={slides} />
    </main>
  );
}
