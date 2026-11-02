import type { journeyTypes } from "@shared/types";
import { BranchDiagram } from "../diagram/BranchDiagram";
import { BlockHeading } from "../BlockHeading";

interface BranchBlockProps {
  block: journeyTypes.JourneyBranchBlock;
}

export function BranchBlock({ block }: BranchBlockProps) {
  return (
    <div className="space-y-16 md:space-y-30 xl:space-y-32">
      <BlockHeading content={block.heading} />
      <BranchDiagram
        source={block.source}
        connector={block.connector}
        branches={block.branches}
        sink={block.sink}
      />
    </div>
  );
}
