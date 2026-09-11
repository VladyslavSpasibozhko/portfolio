import { Typography } from "@components/atoms/Typography";
import { Badge } from "@components/atoms/Badge";
import { InfoCard } from "./InfoCard";
import { JourneySection } from "./JourneySection";

export function CapitalHoldingLearningSlide() {
  return (
    <JourneySection title="Capital Holding" current={5}>
      <div className="w-2/3 space-y-4">
        <Typography tag="h1">I wanted to understand more.</Typography>
        <Typography tag="p" className="text-text-300">
          This was the time when I spent a lot of time learning — courses,
          new technologies, and digging deeper into how things actually
          worked.
        </Typography>
      </div>

      <div className="mt-8 space-y-3">
        <Typography tag="h4" className="text-text-blue">
          Courses & learning
        </Typography>
        <div className="flex gap-3">
          <Badge>JavaScript Advanced</Badge>
          <Badge>React.js</Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-10 w-2/3">
        <InfoCard icon="bookmark" title="More projects" />
        <InfoCard icon="info" title="More questions" />
      </div>
    </JourneySection>
  );
}
