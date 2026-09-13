import type { JourneyStepsBlock } from "@types";
import { StepsDiagram } from "../diagram/StepsDiagram";
import { BlockHeading } from "../BlockHeading";

interface StepsBlockProps {
  block: JourneyStepsBlock;
}

export function StepsBlock({ block }: StepsBlockProps) {
  return (
    <div className="space-y-4 md:space-y-8">
      <BlockHeading content={block.heading} />
      <StepsDiagram steps={block.steps} orientation={block.orientation} />
    </div>
  );
}
