interface IconProps {
  name: 'chevron-down' | 'send' | 'close' | 'menu' | 'external-link' | 'ai-chat';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const icons = {
  "chevron-down": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 14l-7 7m0 0l-7-7m7 7V3"
    />
  ),
  send: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12Zm0 0h7.5"
    />
  ),
  close: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  ),
  menu: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  ),
  "external-link": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  ),
  "ai-chat": (
    <>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        opacity={0.5}
        d="M4 2H14A2 2 0 0116 4V9A2 2 0 0114 11H7L4 13L5 11H4A2 2 0 012 9V4A2 2 0 014 2Z"
      />
      <circle cx="7" cy="5.5" r="0.8" fill="currentColor" stroke="none" opacity={0.5} />
      <circle cx="9" cy="5.5" r="0.8" fill="currentColor" stroke="none" opacity={0.5} />
      <circle cx="11" cy="5.5" r="0.8" fill="currentColor" stroke="none" opacity={0.5} />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10 11H20A2 2 0 0122 13V18A2 2 0 0120 20H13L9 21L11 20H10A2 2 0 018 18V13A2 2 0 0110 11Z"
      />
      <circle cx="13" cy="14.5" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="15" cy="14.5" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="17" cy="14.5" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
};

export function Icon({ name, size = 'md', className = '' }: IconProps) {
  return (
    <svg
      className={`${sizeClasses[size]} ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      {icons[name]}
    </svg>
  );
}
