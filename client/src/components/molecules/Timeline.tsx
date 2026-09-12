import { Typography } from "@components/atoms/Typography";
import { useEffect, useRef } from "react";

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

interface TimelineEntryProps {
  item: TimelineItem;
  isLast: boolean;
}

function TimelineEntry({ item, isLast }: TimelineEntryProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const line = lineRef.current;
    if (!dot || !line) return;

    // The line is centered on the dot's own rendered size rather than a
    // fixed offset, so it stays aligned if the dot's size ever changes
    // (e.g. a future responsive size prop).
    const center = () => {
      line.style.top = `${dot.offsetHeight / 2}px`;
      line.style.left = `${dot.offsetWidth / 2}px`;
    };

    center();

    const observer = new ResizeObserver(center);
    observer.observe(dot);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative flex flex-1 flex-col items-start gap-2 sm:gap-3">
      <div
        ref={dotRef}
        className="relative z-10 h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 rounded-full bg-background-white after:absolute after:w-full after:h-full after:z-20 after:border after:border-border-focus after:rounded-lg after:animate-pulse-scale"
      />
      {!isLast && (
        <div
          ref={lineRef}
          className="absolute w-full h-px -translate-y-1/2 bg-border-focus overflow-x-hidden"
        >
          <div className="absolute -top-3 left-0 h-6 w-1/4 bg-linear-to-r from-transparent via-accent-cyan to-transparent blur-[3px] animate-line-sweep" />
        </div>
      )}
      <div className="flex flex-col gap-1">
        <Typography tag="h4" className="text-16 sm:text-18 md:text-20 lg:text-24 xl:text-26 2xl:text-30 text-text-100">{item.year}</Typography>
        <Typography tag="p" className="text-12 sm:text-14 md:text-16 lg:text-18 xl:text-20 2xl:text-24 text-text-200">
          {item.title}
        </Typography>
        <Typography tag="p" className="text-10 sm:text-12 md:text-14 lg:text-16 xl:text-18 text-text-sky">
          {item.description}
        </Typography>
      </div>
    </div>
  );
}

export function Timeline({ items, className = "" }: TimelineProps) {
  return (
    <div className={`flex ${className}`}>
      {items.map((item, index) => (
        <TimelineEntry
          key={item.year}
          item={item}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
}
