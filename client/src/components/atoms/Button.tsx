import type { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'inline';
  size?: 'sm' | 'md' | 'lg';
}

const variantClasses = {
  primary:
    "rounded-lg cursor-pointer bg-dark-500 transition-all duration-200",
  secondary:
    "rounded-lg cursor-pointer border backdrop-blur-sm transition-all duration-200",
  ghost:
    "rounded-lg cursor-pointer transition-all duration-200",
  inline:
    "cursor-pointer border-b transition-all duration-200 ",
};

const sizeClasses = {
  sm: 'p-3 text-14',
  md: 'p-4 text-16',
  lg: 'p-6 text-18',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
