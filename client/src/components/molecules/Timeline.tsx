import { Typography } from "@components/atoms/Typography";
import { Link } from "@components/atoms/Link";
import { useIntersectionObserver } from "@hooks/useIntersectionObserver";
import { useEffect, useRef, useState, type CSSProperties } from "react";

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  href?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

// The entrance plays as one sequence: a dot pops in, its text rises, then the
// line draws on to the next dot and lands just as that dot appears.
const STEP_MS = 550;
const TEXT_OFFSET_MS = 120;
const LINE_OFFSET_MS = 200;

interface AnimationTimingParams {
  delay: number;
  duration?: number;
}

// Feeds the variables the `animate-timeline-*` utilities in index.css read.
function animationTiming({
  delay,
  duration,
}: AnimationTimingParams): CSSProperties {
  return {
    "--timeline-delay": `${delay}ms`,
    ...(duration !== undefined && { "--timeline-duration": `${duration}ms` }),
  } as CSSProperties;
}

interface TimelineEntryProps {
  item: TimelineItem;
  index: number;
  isLast: boolean;
}

function TimelineEntry({ item, index, isLast }: TimelineEntryProps) {
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

  const start = index * STEP_MS;
  const lineEnd = start + STEP_MS;

  // Phones get a stacked timeline with a vertical line; from `sm` up the
  // entries sit in a row joined by a horizontal line.
  return (
    <li className="relative flex flex-1 flex-row sm:flex-col items-start gap-4 sm:gap-3 pb-6 sm:pb-0">
      {/* The ring is the dot's own `::after`, so it scales in with the dot. */}
      <div
        ref={dotRef}
        style={animationTiming({ delay: start })}
        className={`relative z-10 shrink-0 h-16 w-16 sm:h-12 sm:w-12 2xl:h-16 2xl:w-16 rounded-full bg-background-white animate-timeline-dot-in after:absolute after:inset-0 after:z-20 after:rounded-full after:border after:border-border-focus ${
          isLast
            ? "shadow-lg shadow-accent-cyan after:animate-timeline-ping-loop"
            : "after:animate-timeline-ping"
        }`}
      />
      {!isLast && (
        <div
          ref={lineRef}
          aria-hidden="true"
          className="absolute h-full w-px -translate-x-1/2 overflow-y-clip sm:h-px sm:w-full sm:translate-x-0 sm:-translate-y-1/2 sm:overflow-y-visible sm:overflow-x-hidden bg-border-DEFAULT"
        >
          {/* A dim track is there from the start; the bright fill draws over it. */}
          <div
            style={animationTiming({
              delay: start + LINE_OFFSET_MS,
              duration: STEP_MS - LINE_OFFSET_MS,
            })}
            className="absolute inset-0 bg-border-focus origin-top sm:origin-left animate-timeline-draw-y sm:animate-timeline-draw-x"
          />
          {/* The sweep only starts once its line has finished drawing. */}
          <div
            style={animationTiming({ delay: lineEnd })}
            className="absolute inset-0 animate-timeline-fade-in"
          >
            <div className="absolute top-0 -left-1 h-1/4 w-2 bg-linear-to-b animate-line-sweep-y sm:-top-3 sm:left-0 sm:h-6 sm:w-1/4 sm:bg-linear-to-r sm:animate-line-sweep from-transparent via-accent-cyan to-transparent blur-[3px]" />
          </div>
        </div>
      )}
      <div
        style={animationTiming({ delay: start + TEXT_OFFSET_MS })}
        className="flex flex-col gap-1 animate-timeline-rise"
      >
        <Typography tag="h4" className="text-16 sm:text-18 md:text-20 lg:text-24 xl:text-26 2xl:text-30 text-text-100">{item.year}</Typography>
        <Typography tag="p" className="text-16 sm:text-14 md:text-16 lg:text-18 xl:text-20 2xl:text-24 text-text-200">
          {item.title}
        </Typography>
        <Typography tag="p" className="text-14 sm:text-12 md:text-14 lg:text-16 xl:text-18 text-text-sky">
          {item.href ? (
            <Link href={item.href} className="text-text-sky">
              {item.description}
            </Link>
          ) : (
            item.description
          )}
        </Typography>
      </div>
    </li>
  );
}

export function Timeline({ items, className = "" }: TimelineProps) {
  const ref = useRef<HTMLOListElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  // Plays once, the first time the timeline is mostly on screen, and stays
  // settled after that instead of replaying on every scroll past.
  useIntersectionObserver({
    ref,
    threshold: 0.4,
    onIntersect: (isIntersecting) => {
      if (isIntersecting) setHasEntered(true);
    },
  });

  return (
    // An ordered list, so the entries are announced as a sequence. `role`
    // restores list semantics that Safari drops once list styles are reset.
    <ol
      ref={ref}
      role="list"
      style={
        {
          "--timeline-play-state": hasEntered ? "running" : "paused",
        } as CSSProperties
      }
      className={`flex flex-col sm:flex-row ${className}`}
    >
      {items.map((item, index) => (
        <TimelineEntry
          key={item.year}
          item={item}
          index={index}
          isLast={index === items.length - 1}
        />
      ))}
    </ol>
  );
}
