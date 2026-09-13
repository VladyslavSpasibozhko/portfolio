import type { JourneyBranchBlock } from "@types";
import { BranchDiagram } from "../diagram/BranchDiagram";
import { BlockHeading } from "../BlockHeading";

interface BranchBlockProps {
  block: JourneyBranchBlock;
}

export function BranchBlock({ block }: BranchBlockProps) {
  return (
    <div className="space-y-4 md:space-y-7.5 xl:space-y-8">
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
