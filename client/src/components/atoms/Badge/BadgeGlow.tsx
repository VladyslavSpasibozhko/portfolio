import { useEffect, useState, type RefObject } from "react";

const BADGE_GLOW_DEFAULTS = {
  // border color of the glowing line — a Tailwind `stroke-*` utility class
  colorClassName: "stroke-border-focus",
  // thickness of the line, in px — keep close to the badge's own (measured)
  // border-width or the glow will visibly spill outside the border it traces
  strokeWidth: 3,
  // length of the bright glow, as a % of the badge's full perimeter (0-100)
  segmentLength: 25,
  // time for one full lap around the badge, in seconds
  durationS: 4,
  // softness of the fade at both ends of the glow; higher = smoother/longer fade
  blurStdDeviation: 6,
};

export type BadgeGlowConfig = typeof BADGE_GLOW_DEFAULTS;

// Points per rounded cap used to approximate it as straight segments (see
// getPillPath for why arcs are avoided).
const CAP_SEGMENTS = 24;

function getPillPath(width: number, height: number, borderWidth: number) {
  // The path is traced along the badge's border centerline: inset by half
  // the badge's own border-width from the outer edge on every side.
  const inset = borderWidth / 2;
  const insetHeight = height - borderWidth;
  const r = insetHeight / 2;
  const left = inset;
  const top = inset;
  const right = width - inset;
  const bottom = height - inset;
  const midY = (top + bottom) / 2;
  const rightCapCenterX = right - r;
  const leftCapCenterX = left + r;

  // The rounded caps are approximated with many short straight segments
  // instead of arc commands. Two arc commands are needed to trace each cap
  // without hitting an exactly-tangent degenerate arc (radius == half the
  // chord length), but browsers have been observed to glitch
  // animateMotion's rotate="auto" — which needs the path's tangent
  // direction at every point — right at the point where those two arc
  // commands meet, even though the underlying curve is mathematically
  // smooth there. A polyline has no such ambiguity: every segment's
  // direction is trivial to compute, so rotate="auto" has nothing to
  // stumble on.
  const points: Array<[number, number]> = [
    [left + r, top],
    [right - r, top],
  ];

  for (let i = 1; i <= CAP_SEGMENTS; i++) {
    const angle = (-90 + (180 * i) / CAP_SEGMENTS) * (Math.PI / 180);
    points.push([
      rightCapCenterX + r * Math.cos(angle),
      midY + r * Math.sin(angle),
    ]);
  }

  points.push([left + r, bottom]);

  for (let i = 1; i <= CAP_SEGMENTS; i++) {
    const angle = (90 + (180 * i) / CAP_SEGMENTS) * (Math.PI / 180);
    points.push([
      leftCapCenterX + r * Math.cos(angle),
      midY + r * Math.sin(angle),
    ]);
  }

  const [start, ...rest] = points;
  const moveTo = `M ${start[0]},${start[1]}`;
  const lineTos = rest.map(([x, y]) => `L ${x},${y}`).join(" ");

  return `${moveTo} ${lineTos} Z`;
}

function getPillPerimeter(width: number, height: number, borderWidth: number) {
  const insetWidth = width - borderWidth;
  const insetHeight = height - borderWidth;
  // Two straight edges (top + bottom), each (insetWidth - insetHeight) long,
  // plus the two semicircular caps, whose combined circumference is one full
  // circle.
  return 2 * (insetWidth - insetHeight) + Math.PI * insetHeight;
}

interface BadgeGlowProps extends Partial<BadgeGlowConfig> {
  containerRef: RefObject<HTMLSpanElement | null>;
}

export function BadgeGlow({
  containerRef,
  colorClassName = BADGE_GLOW_DEFAULTS.colorClassName,
  strokeWidth = BADGE_GLOW_DEFAULTS.strokeWidth,
  segmentLength = BADGE_GLOW_DEFAULTS.segmentLength,
  durationS = BADGE_GLOW_DEFAULTS.durationS,
  blurStdDeviation = BADGE_GLOW_DEFAULTS.blurStdDeviation,
}: BadgeGlowProps) {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    borderWidth: 0,
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      // Read the badge's actual, rendered border-width instead of
      // duplicating it as a config constant here — it's owned by Badge.tsx's
      // className and can change independently of this component.
      const borderWidth = parseFloat(getComputedStyle(el).borderTopWidth) || 0;

      const rect = el.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height, borderWidth });
    };

    const observer = new ResizeObserver(measure);
    observer.observe(el, { box: "border-box" });
    return () => observer.disconnect();
  }, [containerRef]);

  const { width, height, borderWidth } = dimensions;
  if (width === 0 || height === 0) return null;

  const path = getPillPath(width, height, borderWidth);
  const perimeter = getPillPerimeter(width, height, borderWidth);
  const glowHalfLength = (perimeter * (segmentLength / 100)) / 2;

  return (
    <svg
      className="pointer-events-none absolute overflow-visible"
      // `absolute` positions against the parent's padding box, not its
      // border box — the containing block starts inside the parent's own
      // border. Since our path coordinates assume (0,0) is the outer edge
      // of the border box, the svg is shifted out by -borderWidth here to
      // actually land there.
      style={{ top: -borderWidth, left: -borderWidth }}
      width={width}
      height={height}
      aria-hidden="true"
    >
      <defs>
        <filter
          id="badge-glow-soften"
          x="-200%"
          y="-200%"
          width="400%"
          height="400%"
        >
          <feGaussianBlur stdDeviation={blurStdDeviation} />
        </filter>
        <mask
          id="badge-glow-mask"
          maskUnits="userSpaceOnUse"
          x={-width}
          y={-height}
          width={width * 3}
          height={height * 3}
        >
          <rect
            x={-width}
            y={-height}
            width={width * 3}
            height={height * 3}
            fill="black"
          />
          {[0, 1].map((i) => (
            <ellipse
              key={i}
              rx={glowHalfLength}
              ry={strokeWidth * 1.5}
              fill="white"
              filter="url(#badge-glow-soften)"
            >
              <animateMotion
                dur={`${durationS}s`}
                repeatCount="indefinite"
                path={path}
                rotate="auto"
                begin={i === 0 ? "0s" : `-${durationS / 2}s`}
              />
            </ellipse>
          ))}
        </mask>
      </defs>
      <path
        d={path}
        className={colorClassName}
        fill="none"
        strokeWidth={strokeWidth}
        mask="url(#badge-glow-mask)"
      />
    </svg>
  );
}
