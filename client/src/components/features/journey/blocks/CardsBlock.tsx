import type { JourneyCardsBlock } from "@types";
import { Typography } from "@components/atoms/Typography";
import { isIconName } from "@components/atoms/Icon";
import { InfoCard } from "../InfoCard";
import { BadgeRow } from "../BadgeRow";
import { BlockHeading } from "../BlockHeading";

const columnClasses: Record<NonNullable<JourneyCardsBlock["columns"]>, string> =
  {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
  };

interface CardsBlockProps {
  block: JourneyCardsBlock;
}

export function CardsBlock({ block }: CardsBlockProps) {
  const { heading, columns = 2, cards } = block;

  return (
    <div className="space-y-8 md:space-y-14 xl:space-y-16">
      <BlockHeading content={heading} />
      <div className={`grid gap-8 md:gap-14 xl:gap-24 ${columnClasses[columns]}`}>
        {cards.map((card) => (
          <InfoCard
            key={card.title}
            icon={isIconName(card.icon) ? card.icon : undefined}
            title={card.title}
            description={card.description}
            className={card.wide && columns === 2 ? "md:col-span-2" : ""}
          >
            {card.detail && (
              <Typography
                tag="p"
                className="text-14 md:text-12 lg:text-14 xl:text-18 text-text-300"
              >
                {card.detail}
              </Typography>
            )}
            {card.badges && <BadgeRow badges={card.badges} />}
          </InfoCard>
        ))}
      </div>
    </div>
  );
}
