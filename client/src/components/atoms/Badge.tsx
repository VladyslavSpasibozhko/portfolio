import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  className?: string;
}

const variantClasses = {
  default: 'bg-white/5 text-gray-200 border border-white/10 hover:border-white/50 hover:bg-white/10 hover:shadow-[0_0_16px_-2px_rgba(255,255,255,0.5)]',
  primary: 'bg-white/5 text-gray-200 border border-white/10 hover:border-white/50 hover:bg-white/10 hover:shadow-[0_0_16px_-2px_rgba(255,255,255,0.5)]',
  success: 'bg-green-900/60 text-green-200 border border-green-700/60',
  warning: 'bg-yellow-900/60 text-yellow-200 border border-yellow-700/60',
  error: 'bg-red-900/60 text-red-200 border border-red-700/60',
};

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-sm font-medium backdrop-blur-sm transition-all duration-200 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
