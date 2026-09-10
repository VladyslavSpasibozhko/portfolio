import { useRef, type ReactNode } from "react";
import { BadgeGlow, type BadgeGlowConfig } from "./BadgeGlow";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "primary";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

const variantClasses = {
  default: "bg-background-700 border border-border-focus text-text-blue",
  primary: "border border border-border-focus text-text-sky",
};

const sizeClasses = {
  sm: "px-4 py-2 text-10",
  md: "px-4 py-2 text-12",
  lg: "px-4 py-2 text-14",
  xl: "px-4 py-2 text-16",
  "2xl": "px-4 py-2 text-18",
};

const sizeGlowConfig: Record<
  NonNullable<BadgeProps["size"]>,
  Partial<BadgeGlowConfig>
> = {
  sm: { strokeWidth: 2, segmentLength: 30, blurStdDeviation: 4 },
  md: { strokeWidth: 3, segmentLength: 26, blurStdDeviation: 4 },
  lg: { strokeWidth: 3, segmentLength: 24, blurStdDeviation: 4 },
  xl: { strokeWidth: 3, segmentLength: 24, blurStdDeviation: 4 },
  "2xl": { strokeWidth: 4, segmentLength: 24, blurStdDeviation: 4.5 },
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
}: BadgeProps) {
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <span
      ref={ref}
      className={`relative inline-block rounded-full ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {variant === "primary" && (
        <BadgeGlow containerRef={ref} {...sizeGlowConfig[size]} />
      )}
      {children}
    </span>
  );
}
