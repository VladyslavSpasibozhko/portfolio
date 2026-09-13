import type { ReactNode } from 'react';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'small';

interface TypographyProps {
  tag?: TypographyVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<TypographyVariant, string> = {
  h1: "font-bold tracking-tight",
  h2: "font-bold",
  h3: "font-semibold",
  h4: "font-semibold",
  p: "leading-relaxed",
  span: "",
  small: "",
};

const variantSizeClasses: Record<TypographyVariant, string> = {
  h1: "text-48",
  h2: "text-30",
  h3: "text-24",
  h4: "text-20",
  p: "text-16",
  span: "text-16",
  small: "text-14",
};

// Tailwind resolves conflicting utilities by stylesheet order, not class
// order, so a default size would silently override an unprefixed size passed
// in `className` (e.g. `text-12 md:text-16` would stay 16px on mobile).
const unprefixedSizePattern = /(^|\s)text-\d+(?=\s|$)/;

export function Typography({
  tag = "p",
  children,
  className = "text-white",
}: TypographyProps) {
  const Tag = tag as keyof JSX.IntrinsicElements;
  const sizeClass = unprefixedSizePattern.test(className)
    ? ""
    : variantSizeClasses[tag];

  return (
    <Tag className={`${sizeClass} ${variantClasses[tag]} ${className}`}>
      {children}
    </Tag>
  );
}
