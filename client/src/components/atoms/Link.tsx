import type { ReactNode } from "react";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

export function Link({ children, className = "", ...props }: LinkProps) {
  return (
    <a
      className={`text-text-white border-b border-border-DEFAULT hover:text-text-300 hover:border-border-strong ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
