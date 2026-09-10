import { useRef, type ReactNode } from "react";
import { BadgeGlow } from "./BadgeGlow";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "primary";
  size?: "sm" | "md" | "xl" | "2xl" | "3xl";
  className?: string;
}

const variantClasses = {
  default: "bg-background-700 border border-border-focus text-text-blue",
  primary: "border border border-border-focus text-text-sky",
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-10",
  md: "px-2.5 py-0.5 text-12",
  xl: "px-3 py-1 text-14",
  "2xl": "px-3.5 py-1.5 text-16",
  "3xl": "px-4 py-2 text-18",
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
      {variant === "primary" && <BadgeGlow containerRef={ref} />}
      {children}
    </span>
  );
}
