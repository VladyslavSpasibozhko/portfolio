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

interface JourneySlideDefinition {
  id: string;
  Component: (props: { pageIndex: number }) => React.ReactElement;
}

const slideDefinitions: JourneySlideDefinition[] = [
  { id: "intro", Component: IntroSlide },
  { id: "journey-timeline", Component: JourneyTimelineSlide },
  { id: "capital-holding-projects", Component: CapitalHoldingProjectsSlide },
  { id: "capital-holding-learning", Component: CapitalHoldingLearningSlide },
  { id: "datamix-intro", Component: DataMixIntroSlide },
  { id: "datamix-projects", Component: DataMixProjectsSlide },
  { id: "remed-intro", Component: RemedIntroSlide },
  { id: "remed-ownership", Component: RemedOwnershipSlide },
  { id: "workjam-intro", Component: WorkJamIntroSlide },
  { id: "workjam-problems", Component: WorkJamProblemsSlide },
  { id: "big-picture", Component: BigPictureSlide },
];

const slides: Slide[] = slideDefinitions.map(({ id, Component }, index) => ({
  id,
  content: <Component pageIndex={index + 1} />,
}));

export function MainPage() {
  return <Slider slides={slides} />;
}
