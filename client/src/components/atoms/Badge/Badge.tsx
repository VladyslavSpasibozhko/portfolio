import type { CSSProperties, ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "primary";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  /**
   * Position in a row of badges. Offsets the primary sheen so neighbours
   * catch the light one after another instead of flashing in unison.
   */
  index?: number;
  className?: string;
}

// The gap between neighbouring sheens, and how many of them run before the
// sequence starts over — beyond that the wait would feel random, not ordered.
const SHEEN_STAGGER_MS = 180;
const SHEEN_STAGGER_LIMIT = 8;

const variantClasses = {
  default:
    "border border-border-highlight bg-linear-to-b from-background-700 to-background-850 text-text-blue",
  primary:
    "overflow-hidden border border-border-focus bg-linear-to-b from-background-800 to-background-950 text-text-sky shadow-md shadow-accent-cyan/20",
};

const sizeClasses = {
  sm: "px-16 py-8 text-12",
  md: "px-16 py-8 text-12 xl:text-14",
  lg: "px-16 py-8 text-12 md:text-14",
  xl: "px-16 py-8 text-12 md:text-14 xl:text-16",
  "2xl": "px-16 py-8 text-14 xl:text-18",
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  index = 0,
  className = "",
}: BadgeProps) {
  const sheenDelay = {
    "--badge-sheen-delay": `${(index % SHEEN_STAGGER_LIMIT) * SHEEN_STAGGER_MS}ms`,
  } as CSSProperties;

  return (
    <span
      className={`relative isolate inline-block rounded-full ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {variant === "primary" && (
        // A band of light that glides across now and then, like a reflection
        // on glass. It sits under the label, so the text stays crisp.
        <span
          aria-hidden="true"
          style={sheenDelay}
          className="absolute inset-y-0 -left-1/2 -z-10 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-accent-cyan/25 to-transparent animate-badge-sheen"
        />
      )}
      {children}
    </span>
  );
}
