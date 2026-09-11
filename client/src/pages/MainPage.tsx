import { Slider, type Slide } from "@components/molecules/Slider";
import { IntroSlide } from "@components/features/journey/IntroSlide";
import { JourneyTimelineSlide } from "@components/features/journey/JourneyTimelineSlide";
import { CapitalHoldingProjectsSlide } from "@components/features/journey/CapitalHoldingProjectsSlide";
// import { CapitalHoldingBeginningSlide } from "@components/features/journey/CapitalHoldingBeginningSlide";
import { CapitalHoldingLearningSlide } from "@components/features/journey/CapitalHoldingLearningSlide";
import { DataMixIntroSlide } from "@components/features/journey/DataMixIntroSlide";
import { DataMixProjectsSlide } from "@components/features/journey/DataMixProjectsSlide";
import { RemedIntroSlide } from "@components/features/journey/RemedIntroSlide";
import { RemedOwnershipSlide } from "@components/features/journey/RemedOwnershipSlide";
import { WorkJamIntroSlide } from "@components/features/journey/WorkJamIntroSlide";
import { WorkJamProblemsSlide } from "@components/features/journey/WorkJamProblemsSlide";
import { BigPictureSlide } from "@components/features/journey/BigPictureSlide";

const slides: Slide[] = [
  { id: "intro", content: <IntroSlide /> },
  { id: "journey-timeline", content: <JourneyTimelineSlide /> },
  { id: "capital-holding-projects", content: <CapitalHoldingProjectsSlide /> },
  // { id: "capital-holding-beginning", content: <CapitalHoldingBeginningSlide /> },
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
