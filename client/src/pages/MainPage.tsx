import { Slider, type Slide } from "@components/molecules/Slider";
import { IntroSlide } from "@components/features/journey/slides/IntroSlide";
import { JourneyTimelineSlide } from "@components/features/journey/slides/JourneyTimelineSlide";
import { CapitalHoldingProjectsSlide } from "@components/features/journey/slides/CapitalHoldingProjectsSlide";
import { CapitalHoldingLearningSlide } from "@components/features/journey/slides/CapitalHoldingLearningSlide";
import { DataMixIntroSlide } from "@components/features/journey/slides/DataMixIntroSlide";
import { DataMixProjectsSlide } from "@components/features/journey/slides/DataMixProjectsSlide";
import { RemedIntroSlide } from "@components/features/journey/slides/RemedIntroSlide";
import { RemedOwnershipSlide } from "@components/features/journey/slides/RemedOwnershipSlide";
import { WorkJamIntroSlide } from "@components/features/journey/slides/WorkJamIntroSlide";
import { WorkJamProblemsSlide } from "@components/features/journey/slides/WorkJamProblemsSlide";
import { BigPictureSlide } from "@components/features/journey/slides/BigPictureSlide";

const slides: Slide[] = [
  { id: "intro", content: <IntroSlide /> },
  { id: "journey-timeline", content: <JourneyTimelineSlide /> },
  { id: "capital-holding-projects", content: <CapitalHoldingProjectsSlide /> },
  { id: "capital-holding-learning", content: <CapitalHoldingLearningSlide /> },
  { id: "datamix-intro", content: <DataMixIntroSlide /> },
  { id: "datamix-projects", content: <DataMixProjectsSlide /> },
  { id: "remed-intro", content: <RemedIntroSlide /> },
  { id: "remed-ownership", content: <RemedOwnershipSlide /> },
  { id: "workjam-intro", content: <WorkJamIntroSlide /> },
  { id: "workjam-problems", content: <WorkJamProblemsSlide /> },
  { id: "big-picture", content: <BigPictureSlide /> },
];

export function MainPage() {
  return <Slider slides={slides} />;
}
