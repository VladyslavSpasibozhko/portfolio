import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary';
  className?: string;
}

const variantClasses = {
  default: 'border hover:shadow-glow',
  primary: 'border hover:shadow-glow',
};

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-14 font-medium backdrop-blur-sm transition-all duration-200 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
