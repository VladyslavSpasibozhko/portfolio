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
    <div className="relative flex flex-1 flex-col items-start gap-3">
      <div
        ref={dotRef}
        className="relative z-10 h-12 w-12 rounded-full bg-background-white after:absolute after:w-full after:h-full after:z-20 after:border after:border-border-focus after:rounded-lg after:animate-pulse-scale"
      />
      {!isLast && (
        <div
          ref={lineRef}
          className="absolute w-full -translate-y-1/2 border-t border-border-highlight"
        />
      )}
      <div className="flex flex-col gap-1">
        <Typography tag="h4">{item.year}</Typography>
        <Typography tag="span" className="text-text-blue">
          {item.title}
        </Typography>
        <Typography tag="small" className="text-text-400">
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
