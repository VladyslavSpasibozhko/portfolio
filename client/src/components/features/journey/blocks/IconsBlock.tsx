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
          className="italic text-14 lg:text-16 text-text-300"
        >
          {block.note}
        </Typography>
      )}
      {/* `role` restores list semantics that Safari drops once list styles are reset. */}
      <ul role="list" className="flex flex-wrap gap-2">
        {block.icons.filter(isIconName).map((icon) => (
          <li key={icon}>
            <BorderedContainer className="bg-transparent rounded-full!">
              {/* No text label here, so the icon is announced by its own name. */}
              <Icon name={icon} size="4xl" className="text-text-sky" decorative={false} />
            </BorderedContainer>
          </li>
        ))}
      </ul>
    </div>
  );
}
