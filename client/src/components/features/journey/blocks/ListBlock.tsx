import type { JourneyListBlock } from "@types";
import { Typography } from "@components/atoms/Typography";
import { Icon } from "@components/atoms/Icon";
import { BlockHeading } from "../BlockHeading";

interface ListBlockProps {
  block: JourneyListBlock;
}

export function ListBlock({ block }: ListBlockProps) {
  return (
    <div className="space-y-8 md:space-y-14 xl:space-y-24 3xl:space-y-30">
      <BlockHeading content={block.heading} />
      {/* `role` restores list semantics that Safari drops once list styles are reset. */}
      <ul
        role="list"
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 xl:gap-16"
      >
        {block.items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-8 md:gap-6 xl:gap-8 text-text-white"
          >
            <Icon name="arrow-right" size="md" className="" />
            <Typography
              tag="p"
              className="text-14 md:text-12 lg:text-14 xl:text-18"
            >
              {item}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
}
