import type { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const variantClasses = {
  primary:
    "border border-border-highlight text-text-blue hover:border-border-focus hover:text-accent-sky",
  secondary:
    "border border-border-strong text-text-200 hover:border-border-DEFAULT hover:text-text-300",
  ghost: "text-text-blue hover:text-accent-sky",
};

const sizeClasses = {
  sm: "p-3 text-14",
  md: "p-4 text-16",
  lg: "px-5 py-4 text-18",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-lg cursor-pointer inline-flex items-center justify-center ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
