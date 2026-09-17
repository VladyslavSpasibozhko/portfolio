import type { JourneyFlowBlock } from "@types";
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
    <div className="space-y-8 md:space-y-14 lg:space-y-46 xl:space-y-64">
      <BlockHeading content={block.heading} />
      <FlowDiagram steps={steps} />
    </div>
  );
}
