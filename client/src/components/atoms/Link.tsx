import type { ReactNode } from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

export function Link({ children, className = '', ...props }: LinkProps) {
  return (
    <a
      className={`transition-colors duration-200 ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
