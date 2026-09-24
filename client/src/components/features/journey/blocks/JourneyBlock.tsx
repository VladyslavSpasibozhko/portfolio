import type { JourneyBlock as JourneyBlockData } from "@global-types/journey";
import { TextBlock } from "./TextBlock";
import { ListBlock } from "./ListBlock";
import { BadgesBlock } from "./BadgesBlock";
import { CardsBlock } from "./CardsBlock";
import { TimelineBlock } from "./TimelineBlock";
import { FlowBlock } from "./FlowBlock";
import { IconsBlock } from "./IconsBlock";
import { CalloutBlock } from "./CalloutBlock";
import { StepsBlock } from "./StepsBlock";
import { BranchBlock } from "./BranchBlock";

interface JourneyBlockProps {
  block: JourneyBlockData;
}

export function JourneyBlock({ block }: JourneyBlockProps) {
  switch (block.type) {
    case "text":
      return <TextBlock block={block} />;
    case "list":
      return <ListBlock block={block} />;
    case "badges":
      return <BadgesBlock block={block} />;
    case "cards":
      return <CardsBlock block={block} />;
    case "timeline":
      return <TimelineBlock block={block} />;
    case "flow":
      return <FlowBlock block={block} />;
    case "icons":
      return <IconsBlock block={block} />;
    case "callout":
      return <CalloutBlock block={block} />;
    case "steps":
      return <StepsBlock block={block} />;
    case "branch":
      return <BranchBlock block={block} />;
  }
}
