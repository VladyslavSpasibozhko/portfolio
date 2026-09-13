import type { JourneyListBlock } from "@types";
import { Typography } from "@components/atoms/Typography";
import { Icon } from "@components/atoms/Icon";
import { BlockHeading } from "../BlockHeading";

interface ListBlockProps {
  block: JourneyListBlock;
}

export function ListBlock({ block }: ListBlockProps) {
  return (
    <div className="space-y-2 md:space-y-4 lg:space-y-12 xl:space-y-24">
      <BlockHeading content={block.heading} />
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        {block.items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-text-white">
            <Icon name="arrow-right" size="md" className="" />
            <Typography
              tag="p"
              className="text-14 lg:text-16 xl:text-18"
            >
              {item}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
}
