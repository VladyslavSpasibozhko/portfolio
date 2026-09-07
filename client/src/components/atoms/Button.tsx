import type { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'inline';
  size?: 'sm' | 'md' | 'lg';
}

const variantClasses = {
  primary:
    "cursor-pointer bg-dark-500 text-white hover:bg-white/20 transition-all duration-200",
  secondary:
    "cursor-pointer bg-white/5 text-gray-100 border border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-200",
  ghost: "cursor-pointer text-gray-300 hover:bg-white/10 transition-all duration-200",
  inline: "cursor-pointer text-white hover:text-gray-300 transition-all duration-200",
};

const sizeClasses = {
  sm: 'p-3 text-sm',
  md: 'p-4 text-base',
  lg: 'p-6 text-lg',
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
      className={`inline-flex items-center justify-center font-medium rounded-lg transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
