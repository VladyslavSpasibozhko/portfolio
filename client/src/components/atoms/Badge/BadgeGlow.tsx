import { useEffect, useState, type RefObject } from "react";

const BADGE_GLOW_CONFIG = {
  // border color the glow lines are drawn in
  color: "var(--color-border-focus)",
  // thickness of each glow line, in px
  strokeWidth: 1,
  // length of each glow line, as a % of the badge's full perimeter (0-100)
  segmentLength: 25,
  // time for one full lap around the badge, in seconds
  durationS: 4,
  // softness of the glow; higher = blurrier
  blurStdDeviation: 0.8,
};

function getPillPath(width: number, height: number, strokeWidth: number) {
  const radius = height / 2;
  const top = 0;
  const bottom = height - strokeWidth;
  const leftEdgeX = radius;
  const rightEdgeX = width - radius;

  // Nudge the arc radius slightly below the exact chord length (== diameter):
  // some browsers collapse an exactly-tangent semicircle arc into a straight
  // line, which cuts the path in half. The straight edges above still use
  // the true radius so the arcs stay flush with them.
  const arcRadius = radius * 0.94;

  const topEdge = `M ${leftEdgeX},${top} H ${rightEdgeX}`;
  const rightCap = `A ${arcRadius},${arcRadius} 0 0 1 ${rightEdgeX},${bottom}`;
  const bottomEdge = `H ${leftEdgeX}`;
  const leftCap = `A ${arcRadius},${arcRadius} 0 0 1 ${leftEdgeX},${top}`;

  return `${topEdge} ${rightCap} ${bottomEdge} ${leftCap} Z`;
}

interface BadgeGlowProps {
  containerRef: RefObject<HTMLSpanElement | null>;
}

export function BadgeGlow({ containerRef }: BadgeGlowProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      const borderBox = entry.borderBoxSize?.[0];
      if (borderBox) {
        setDimensions({
          width: borderBox.inlineSize,
          height: borderBox.blockSize,
        });
      } else {
        const rect = entry.target.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    });
    observer.observe(el, { box: "border-box" });
    return () => observer.disconnect();
  }, [containerRef]);

  const { width, height } = dimensions;
  if (width === 0 || height === 0) return null;

  const { color, strokeWidth, segmentLength, durationS, blurStdDeviation } =
    BADGE_GLOW_CONFIG;

  const path = getPillPath(width, height, strokeWidth);
  const dashArray = `${segmentLength} ${100 - segmentLength}`;

  return (
    <svg
      className="pointer-events-none absolute inset-0 overflow-visible"
      width={width}
      height={height}
      aria-hidden="true"
    >
      <defs>
        <filter
          id="badge-glow-blur"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation={blurStdDeviation} />
        </filter>
      </defs>
      {[0, 1].map((i) => (
        <path
          key={i}
          d={path}
          pathLength={100}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={dashArray}
          filter="url(#badge-glow-blur)"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;-100"
            dur={`${durationS}s`}
            repeatCount="indefinite"
            begin={i === 0 ? "0s" : `-${durationS / 2}s`}
          />
        </path>
      ))}
    </svg>
  );
}
