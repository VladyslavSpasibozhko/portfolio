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
      className={`p-2 md:p-4 xl:p-6 rounded-lg border border-border-focus bg-background-900 ${className}`}
    >
      {children}
    </div>
  );
}
