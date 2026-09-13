import type { JourneyIconsBlock } from "@types";
import { BorderedContainer } from "@components/atoms/BorderedContainer";
import { Typography } from "@components/atoms/Typography";
import { Icon, isIconName } from "@components/atoms/Icon";
import { BlockHeading } from "../BlockHeading";

interface IconsBlockProps {
  block: JourneyIconsBlock;
}

export function IconsBlock({ block }: IconsBlockProps) {
  return (
    <div className="space-y-2 md:space-y-4">
      <BlockHeading content={block.heading} />
      {block.note && (
        <Typography
          tag="p"
          className="italic text-10 sm:text-12 md:text-14 lg:text-16 text-text-400"
        >
          {block.note}
        </Typography>
      )}
      <div className="flex flex-wrap gap-2">
        {block.icons.filter(isIconName).map((icon) => (
          <BorderedContainer key={icon} className="bg-transparent rounded-full!">
            <Icon name={icon} size="4xl" className="text-text-sky" />
          </BorderedContainer>
        ))}
      </div>
    </div>
  );
}
