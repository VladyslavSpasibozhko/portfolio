import type { ReactNode } from 'react';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'small';

interface TypographyProps {
  tag?: TypographyVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<TypographyVariant, string> = {
  h1: "text-5xl font-bold tracking-tight text-white",
  h2: "text-3xl font-bold text-white",
  h3: "text-2xl font-semibold text-white",
  h4: "text-xl font-semibold text-white",
  p: "text-base leading-relaxed text-gray-300",
  span: "text-base text-gray-300",
  small: "text-sm text-gray-400",
};

export function Typography({
  tag = 'p',
  children,
  className = '',
}: TypographyProps) {
  const Tag = tag as keyof JSX.IntrinsicElements;
  const baseClass = variantClasses[tag];

  return (
    <Tag className={`${baseClass} ${className}`}>
      {children}
    </Tag>
  );
}