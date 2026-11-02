import type { ReactNode } from "react";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

export function Link({ children, className = "", ...props }: LinkProps) {
  return (
    <a
      className={`text-text-white border-b border-border-focus hover:text-text-sky hover:border-accent-cyan ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
