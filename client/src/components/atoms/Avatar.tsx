interface AvatarProps {
  src?: string;
  initials?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
};

export function Avatar({
  src,
  initials,
  alt = 'Avatar',
  size = 'md',
  className = '',
}: AvatarProps) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full bg-white/20 overflow-hidden ${sizeClasses[size]} ${className}`}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="text-white font-semibold">{initials}</span>
      )}
    </div>
  );
}
