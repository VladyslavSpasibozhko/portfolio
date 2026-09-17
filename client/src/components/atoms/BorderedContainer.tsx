import type { ReactNode } from "react";

interface BorderedContainerProps {
  children: ReactNode;
  /**
   * `surface` is a raised panel for content like cards and callouts.
   * `outline` is only a frame, for things that sit on the page itself,
   * like diagram steps and icons.
   */
  variant?: "surface" | "outline";
  className?: string;
}

// The border lights up on hover, easing in rather than snapping, so the
// panel responds without pretending to be clickable.
const baseClasses =
  "p-8 md:p-16 xl:p-24 rounded-lg border transition-[border-color,box-shadow] duration-300 ease-out hover:border-border-focus";

const variantClasses = {
  surface:
    "border-border-highlight bg-linear-to-br from-background-800 via-background-900 to-background-950 inset-shadow-highlight shadow-xl shadow-accent-cyan/5 hover:shadow-accent-cyan/15",
  outline: "border-border-highlight",
};

export function BorderedContainer({
  children,
  variant = "surface",
  className = "",
}: BorderedContainerProps) {
  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}
