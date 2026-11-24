import type { TextareaHTMLAttributes } from "react";

type TextareaVariant = "multiline" | "singleLine";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextareaVariant;
  invalid?: boolean;
}

const BASE_CLASSES =
  "w-full px-16 py-12 rounded-8 border bg-bg-input font-sans text-16 font-regular text-text-primary placeholder:text-text-muted outline-none focus:border-border-accent disabled:opacity-50 disabled:cursor-not-allowed";

const VARIANT_CLASSES: Record<TextareaVariant, string> = {
  multiline: "min-h-96 resize-y",
  singleLine: "min-h-44 resize-none",
};

const BORDER_CLASSES = {
  valid: "border-border-strong",
  invalid: "border-(--color-text-error)",
};

export function Textarea({
  variant = "multiline",
  invalid = false,
  className = "",
  rows = variant === "singleLine" ? 1 : undefined,
  ...props
}: TextareaProps) {
  const borderClass = invalid ? BORDER_CLASSES.invalid : BORDER_CLASSES.valid;

  return (
    <textarea
      rows={rows}
      aria-invalid={invalid || undefined}
      className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${borderClass} ${className}`}
      {...props}
    />
  );
}
