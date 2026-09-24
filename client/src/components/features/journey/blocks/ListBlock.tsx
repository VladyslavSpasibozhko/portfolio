import { useRef, useState, type CSSProperties } from "react";
import type { JourneyListBlock } from "@global-types/journey";
import { Typography } from "@components/atoms/Typography";
import { Icon } from "@components/atoms/Icon";
import { useIntersectionObserver } from "@hooks/useIntersectionObserver";
import { BlockHeading } from "../BlockHeading";

// Each item follows the one before it, so the list reads top to bottom.
const STEP_MS = 120;

interface ListBlockProps {
  block: JourneyListBlock;
}

export function ListBlock({ block }: ListBlockProps) {
  const ref = useRef<HTMLUListElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  // Plays once, the first time the list is on screen, and stays settled after
  // that instead of replaying on every scroll past.
  useIntersectionObserver({
    ref,
    onIntersect: (isIntersecting) => {
      if (isIntersecting) setHasEntered(true);
    },
  });

  return (
    <div className="space-y-8 md:space-y-14 xl:space-y-24 3xl:space-y-30">
      <BlockHeading content={block.heading} />
      {/* `role` restores list semantics that Safari drops once list styles are reset. */}
      <ul
        ref={ref}
        role="list"
        style={
          {
            "--list-play-state": hasEntered ? "running" : "paused",
          } as CSSProperties
        }
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 xl:gap-16"
      >
        {block.items.map((item, index) => (
          <li
            key={item}
            style={{ "--list-delay": `${index * STEP_MS}ms` } as CSSProperties}
            className="flex items-center gap-8 md:gap-6 xl:gap-8 text-text-sky animate-list-item-in"
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
