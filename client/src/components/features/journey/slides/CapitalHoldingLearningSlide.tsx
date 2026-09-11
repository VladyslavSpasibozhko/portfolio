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
          className="pt-14"
          content="This was the time when I spent a lot of time learning — courses, new technologies, and digging deeper into how things actually worked."
        />
      </div>

      <Story className="pt-20" content="Courses & learning" />
      <div className="pt-12 grid grid-cols-2 grid-rows-2 gap-6 w-fit">
        {badges.map((badge) => (
          <Badge variant="primary" size="2xl" className="px-12" key={badge}>{badge}</Badge>
        ))}
      </div>
      <JourneySectionBackground src={laptop} />
    </JourneySection>
  );
}
