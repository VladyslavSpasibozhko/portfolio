import type { JourneyFlowBlock } from "@global-types/journey";
import { isIconName } from "@components/atoms/Icon";
import { FlowDiagram, type FlowStep } from "../FlowDiagram";
import { BlockHeading } from "../BlockHeading";

interface FlowBlockProps {
  block: JourneyFlowBlock;
}

export function FlowBlock({ block }: FlowBlockProps) {
  const steps: FlowStep[] = block.steps.map((step) => ({
    label: step.label,
    icon: isIconName(step.icon) ? step.icon : undefined,
  }));

  return (
    <div className="space-y-8 md:space-y-12 lg:space-y-16 xl:space-y-24 3xl:space-y-36">
      <BlockHeading content={block.heading} />
      <FlowDiagram steps={steps} />
    </div>
  );
}
