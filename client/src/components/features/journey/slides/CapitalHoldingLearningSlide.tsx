import { Badge } from "@components/atoms/Badge";
import { JourneySection, JourneySectionBackground } from "../JourneySection";
import { Title } from "../Title";
import { SubTitle } from "../SubTitle";
import { Story } from "../Story";
import laptop from "@static/laptop_coding.png";

const badges = [
  "JavaScript",
  "React",
  "More projects",
  "More questions",
];

interface CapitalHoldingLearningSlideProps {
  pageIndex: number;
}

export function CapitalHoldingLearningSlide({ pageIndex }: CapitalHoldingLearningSlideProps) {
  return (
    <JourneySection title="Capital Holding" current={pageIndex}>
      <div className="w-1/2">
        <Title content="I wanted to understand more." />
        <SubTitle
          className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12"
          content="This was the time when I spent a lot of time learning — courses, new technologies, and digging deeper into how things actually worked."
        />
      </div>

      <Story className="mt-6 sm:mt-8 md:mt-12 lg:mt-14 xl:mt-18" content="Courses & learning" />
      <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 grid grid-cols-2 grid-rows-2 gap-2 md:gap-4 w-fit">
        {badges.map((badge) => (
          <Badge variant="primary" size="2xl" className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10" key={badge}>{badge}</Badge>
        ))}
      </div>
      <JourneySectionBackground src={laptop} />
    </JourneySection>
  );
}
