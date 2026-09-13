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

  // Phones get a stacked timeline with a vertical line; from `sm` up the
  // entries sit in a row joined by a horizontal line.
  return (
    <div className="relative flex flex-1 flex-row sm:flex-col items-start gap-4 sm:gap-3 pb-6 sm:pb-0">
      <div
        ref={dotRef}
        className="relative z-10 shrink-0 h-16 w-16 sm:h-12 sm:w-12 2xl:h-16 2xl:w-16 rounded-full bg-background-white after:absolute after:w-full after:h-full after:z-20 after:border after:border-border-focus after:rounded-lg after:animate-pulse-scale"
      />
      {!isLast && (
        <div
          ref={lineRef}
          className="absolute h-full w-px -translate-x-1/2 overflow-y-clip sm:h-px sm:w-full sm:translate-x-0 sm:-translate-y-1/2 sm:overflow-y-visible sm:overflow-x-hidden bg-border-focus"
        >
          <div className="absolute top-0 -left-1 h-1/4 w-2 bg-linear-to-b animate-line-sweep-y sm:-top-3 sm:left-0 sm:h-6 sm:w-1/4 sm:bg-linear-to-r sm:animate-line-sweep from-transparent via-accent-cyan to-transparent blur-[3px]" />
        </div>
      )}
      <div className="flex flex-col gap-1">
        <Typography tag="h4" className="text-16 sm:text-18 md:text-20 lg:text-24 xl:text-26 2xl:text-30 text-text-100">{item.year}</Typography>
        <Typography tag="p" className="text-16 sm:text-14 md:text-16 lg:text-18 xl:text-20 2xl:text-24 text-text-200">
          {item.title}
        </Typography>
        <Typography tag="p" className="text-14 sm:text-12 md:text-14 lg:text-16 xl:text-18 text-text-sky">
          {item.description}
        </Typography>
      </div>
    </div>
  );
}

export function Timeline({ items, className = "" }: TimelineProps) {
  return (
    <div className={`flex flex-col sm:flex-row ${className}`}>
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
