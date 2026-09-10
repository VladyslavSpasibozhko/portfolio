import type { ReactNode } from "react";

interface BorderedContainerProps {
  children: ReactNode;
  className?: string;
}

export function BorderedContainer({
  children,
  className = "",
}: BorderedContainerProps) {
  return (
    <div
      className={`p-6 rounded-lg border border-border-focus bg-background-700 ${className}`}
    >
      {children}
    </div>
  );
}
