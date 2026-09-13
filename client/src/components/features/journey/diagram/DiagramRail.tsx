import { Icon } from "@components/atoms/Icon";
import { Typography } from "@components/atoms/Typography";

export type DiagramRailOrientation = "vertical" | "horizontal";

// Tall enough that a label pill riding the rail never outgrows it.
const containerClasses: Record<DiagramRailOrientation, string> = {
  vertical: "h-48 md:h-64 w-full flex-col",
  horizontal: "w-12 xl:w-24 2xl:w-32 h-16 md:h-20 shrink-0 flex-row",
};

// The hairline itself, plus the highlight that sweeps along it.
const trackClasses: Record<DiagramRailOrientation, string> = {
  vertical: "inset-y-0 left-1/2 w-px -translate-x-1/2",
  horizontal: "inset-x-0 top-1/2 h-px -translate-y-1/2",
};

const sweepClasses: Record<DiagramRailOrientation, string> = {
  vertical:
    "left-0 h-1/4 w-full bg-linear-to-b animate-line-sweep-y",
  horizontal: "top-0 w-1/4 h-full bg-linear-to-r animate-line-sweep",
};

// Chevrons point along the flow: down when stacked, right when in a row.
const chevronClasses: Record<DiagramRailOrientation, string> = {
  vertical: "",
  horizontal: "-rotate-90",
};

const reverseChevronClasses: Record<DiagramRailOrientation, string> = {
  vertical: "rotate-180",
  horizontal: "rotate-90",
};

interface DiagramRailProps {
  orientation?: DiagramRailOrientation;
  /** Ride a label on the rail instead of the chevron, e.g. "Context". */
  label?: string;
  /** Show a chevron pointing back as well, for a two-way link. */
  bidirectional?: boolean;
  className?: string;
}

/**
 * The connector between two diagram nodes: a hairline with a highlight
 * sweeping along it, so the eye follows the sequence on its own.
 */
export function DiagramRail({
  orientation = "vertical",
  label,
  bidirectional = false,
  className = "",
}: DiagramRailProps) {
  return (
    <div
      className={`relative flex items-center justify-center ${containerClasses[orientation]} ${className}`}
    >
      <div
        aria-hidden="true"
        className={`absolute bg-border-focus overflow-hidden ${trackClasses[orientation]}`}
      >
        <div
          className={`absolute from-transparent via-accent-cyan to-transparent blur-[2px] ${sweepClasses[orientation]}`}
        />
      </div>

      {label ? (
        <Typography
          tag="p"
          className="relative rounded-full border border-border-focus bg-background-900 px-4 py-2 md:px-3.5 md:py-1.5 xl:px-4 xl:py-2 text-12 xl:text-14 text-text-sky"
        >
          {label}
        </Typography>
      ) : (
        <>
          {/* The chevrons are hidden icons, so the two-way link is spelled out. */}
          {bidirectional && <span className="sr-only">Two-way link</span>}
          {bidirectional && (
            <Icon
              name="chevron-down"
              size="sm"
              className={`relative text-text-blue ${reverseChevronClasses[orientation]}`}
            />
          )}
          <Icon
            name="chevron-down"
            size="sm"
            className={`relative text-text-blue ${chevronClasses[orientation]}`}
          />
        </>
      )}
    </div>
  );
}
