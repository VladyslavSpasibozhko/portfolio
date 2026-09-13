import type { JourneyCalloutBlock } from "@types";
import { BorderedContainer } from "@components/atoms/BorderedContainer";
import { Typography } from "@components/atoms/Typography";
import { Icon, isIconName } from "@components/atoms/Icon";

interface CalloutBlockProps {
  block: JourneyCalloutBlock;
}

export function CalloutBlock({ block }: CalloutBlockProps) {
  return (
    <BorderedContainer className="w-full flex items-center gap-2 lg:gap-4">
      {isIconName(block.icon) && (
        <Icon name={block.icon} size="2xl" className="text-text-white" />
      )}
      <Typography
        tag="p"
        className="italic text-16 md:text-18 xl:text-22 2xl:text-26 text-text-300"
      >
        {block.text}
      </Typography>
    </BorderedContainer>
  );
}
