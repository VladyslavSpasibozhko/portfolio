import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const BASE_CLASSES =
  "inline-flex items-center justify-center py-12 rounded-8 border font-sans font-semibold cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-text-accent)";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-bg-accent text-text-onAccent border-border-accent hover:enabled:opacity-90",
  secondary:
    "bg-transparent text-text-primary border-border-strong hover:enabled:border-border-accent",
  ghost:
    "bg-transparent text-text-secondary border-transparent hover:enabled:text-text-primary",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "min-h-36 px-12 text-14",
  md: "min-h-44 px-20 text-16",
  xl: "min-h-52 px-24 text-18",
};

export function Button({
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
