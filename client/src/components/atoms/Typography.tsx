import type { ReactNode } from "react";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "bodyLarge"
  | "body"
  | "small"
  | "caption";

type TypographyTag = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "dt" | "dd";

type TypographyTone =
  | "primary"
  | "body"
  | "secondary"
  | "muted"
  | "accent"
  | "error";

type TypographyWeight = "regular" | "medium" | "semibold" | "bold";

interface TypographyProps {
  variant?: TypographyVariant;
  tag?: TypographyTag;
  tone?: TypographyTone;
  weight?: TypographyWeight;
  className?: string;
  children: ReactNode;
}

const DEFAULT_TAGS: Record<TypographyVariant, TypographyTag> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  bodyLarge: "p",
  body: "p",
  small: "p",
  caption: "span",
};

const SIZE_CLASSES: Record<TypographyVariant, string> = {
  h1: "text-40 tablet:text-60",
  h2: "text-32 tablet:text-40",
  h3: "text-20 tablet:text-24",
  bodyLarge: "text-16 tablet:text-18",
  body: "text-16",
  small: "text-14",
  caption: "text-12",
};

const DEFAULT_TONES: Record<TypographyVariant, TypographyTone> = {
  h1: "primary",
  h2: "primary",
  h3: "primary",
  bodyLarge: "body",
  body: "body",
  small: "secondary",
  caption: "muted",
};

const DEFAULT_WEIGHTS: Record<TypographyVariant, TypographyWeight> = {
  h1: "bold",
  h2: "bold",
  h3: "semibold",
  bodyLarge: "regular",
  body: "regular",
  small: "regular",
  caption: "medium",
};

const TONE_CLASSES: Record<TypographyTone, string> = {
  primary: "text-text-primary",
  body: "text-text-body",
  secondary: "text-text-secondary",
  muted: "text-text-muted",
  accent: "text-text-accent",
  error: "text-text-error",
};

const WEIGHT_CLASSES: Record<TypographyWeight, string> = {
  regular: "font-regular",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

export function Typography({
  variant = "body",
  tag,
  tone,
  weight,
  className = "",
  children,
}: TypographyProps) {
  const Tag = tag ?? DEFAULT_TAGS[variant];
  const toneClass = TONE_CLASSES[tone ?? DEFAULT_TONES[variant]];
  const weightClass = WEIGHT_CLASSES[weight ?? DEFAULT_WEIGHTS[variant]];

  return (
    <Tag
      className={`font-sans ${SIZE_CLASSES[variant]} ${toneClass} ${weightClass} ${className}`}
    >
      {children}
    </Tag>
  );
}
