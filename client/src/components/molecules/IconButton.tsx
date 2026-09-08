import { Icon } from '@components/atoms/Icon';

interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: React.ComponentProps<typeof Icon>['name'];
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  'aria-label': string;
}

const variantClasses = {
  primary:
    'rounded-lg cursor-pointer bg-dark-500 text-white hover:bg-white/20 transition-all duration-200',
  secondary:
    'rounded-lg cursor-pointer bg-white/5 text-gray-100 border border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-200',
  ghost:
    'rounded-lg cursor-pointer text-gray-300 hover:bg-white/10 transition-all duration-200',
};

const sizeClasses = {
  sm: { button: 'p-1', icon: 'sm' },
  md: { button: 'p-2', icon: 'md' },
  lg: { button: 'p-3', icon: 'lg' },
  xl: { button: 'p-3', icon: 'xl' },
  '2xl': { button: 'p-4', icon: '2xl' },
  '3xl': { button: 'p-4', icon: '3xl' },
  '4xl': { button: 'p-5', icon: '4xl' },
  '5xl': { button: 'p-5', icon: '5xl' },
} as const;

export function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  className = '',
  ...props
}: IconButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center ${variantClasses[variant]} ${sizeClasses[size].button} ${className}`}
      {...props}
    >
      <Icon name={icon} size={sizeClasses[size].icon} />
    </button>
  );
}
