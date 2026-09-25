import type { JourneyStepsBlock } from "@global-types/journey";
import { StepsDiagram } from "../diagram/StepsDiagram";
import { BlockHeading } from "../BlockHeading";

interface StepsBlockProps {
  block: JourneyStepsBlock;
}

export function StepsBlock({ block }: StepsBlockProps) {
  return (
    <div className="space-y-16 md:space-y-30 xl:space-y-32">
      <BlockHeading content={block.heading} />
      <StepsDiagram steps={block.steps} orientation={block.orientation} />
    </div>
  );
}
