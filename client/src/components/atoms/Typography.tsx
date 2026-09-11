import type { ReactNode } from 'react';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'small';

interface TypographyProps {
  tag?: TypographyVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<TypographyVariant, string> = {
  h1: "text-48 font-bold tracking-tight",
  h2: "text-30 font-bold",
  h3: "text-24 font-semibold",
  h4: "text-20 font-semibold",
  p: "text-16 leading-relaxed",
  span: "text-16",
  small: "text-14",
};

export function Typography({
  tag = "p",
  children,
  className = "text-white",
}: TypographyProps) {
  const Tag = tag as keyof JSX.IntrinsicElements;
  const baseClass = variantClasses[tag];

  return <Tag className={`${baseClass} ${className}`}>{children}</Tag>;
}