import type { JourneyBadgesBlock } from "@global-types/journey";
import { Badge } from "@components/atoms/Badge";
import { Icon, isIconName } from "@components/atoms/Icon";
import { Typography } from "@components/atoms/Typography";
import { BlockHeading } from "../BlockHeading";

const layoutClasses: Record<
  NonNullable<JourneyBadgesBlock["layout"]>,
  string
> = {
  row: "flex flex-wrap items-center gap-8 md:gap-14 xl:gap-16",
  column: "flex flex-col items-start gap-8 md:gap-14 xl:gap-16",
  grid: "grid grid-cols-2 gap-8 md:gap-14 xl:gap-16 w-fit",
};

interface BadgesBlockProps {
  block: JourneyBadgesBlock;
}

export function BadgesBlock({ block }: BadgesBlockProps) {
  const { heading, note, layout = "row", badges } = block;

  return (
    <div className="flex flex-col gap-8 md:gap-14 xl:gap-16">
      <BlockHeading content={heading} />
      {note && (
        <Typography
          tag="p"
          className="italic text-14 md:text-12 lg:text-14 xl:text-16 text-text-300"
        >
          {note}
        </Typography>
      )}
      {/* `role` restores list semantics that Safari drops once list styles are reset. */}
      <ul role="list" className={layoutClasses[layout]}>
        {badges.map((badge) => (
          <li key={badge.label}>
            <Badge className="w-full" size="2xl" variant="primary">
              <span className="flex items-center gap-8 md:gap-6 xl:gap-8">
                {isIconName(badge.icon) && (
                  <Icon name={badge.icon} size="lg" className="text-text-white" />
                )}
                {badge.label}
              </span>
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}
