import type { JourneyBadgesBlock } from "@types";
import { Badge } from "@components/atoms/Badge";
import { Icon, isIconName } from "@components/atoms/Icon";
import { Typography } from "@components/atoms/Typography";
import { BlockHeading } from "../BlockHeading";

const layoutClasses: Record<
  NonNullable<JourneyBadgesBlock["layout"]>,
  string
> = {
  row: "flex flex-wrap items-center gap-2 md:gap-4",
  column: "flex flex-col items-start gap-2 md:gap-4",
  grid: "grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 w-fit",
};

interface BadgesBlockProps {
  block: JourneyBadgesBlock;
}

export function BadgesBlock({ block }: BadgesBlockProps) {
  const { heading, note, layout = "row", badges } = block;

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <BlockHeading content={heading} />
      {note && (
        <Typography
          tag="p"
          className="italic text-14 lg:text-16 text-text-300"
        >
          {note}
        </Typography>
      )}
      <div className={layoutClasses[layout]}>
        {badges.map((badge) => (
          <Badge key={badge.label} size="2xl">
            <span className="flex items-center gap-2">
              {isIconName(badge.icon) && (
                <Icon name={badge.icon} size="lg" className="text-text-white" />
              )}
              {badge.label}
            </span>
          </Badge>
        ))}
      </div>
    </div>
  );
}
