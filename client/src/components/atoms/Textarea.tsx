import { useEffect, useRef, type TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  autoResize?: boolean;
  maxHeight?: number;
}

export function Textarea({
  className = "",
  autoResize = false,
  maxHeight,
  value,
  rows = 1,
  ...props
}: TextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const styles = {
    maxHeight: maxHeight ?? "auto",
  };

  const classes = [
    "px-16",
    "py-13",
    "border",
    "border-border-highlight",
    "rounded-lg",
    "leading-normal",
    "text-16",
    "text-text-white",
    "placeholder:text-text-white",
    "focus:outline-none",
    "hover:border-border-focus",
    "hover:border-border-focus",
    "focus:border-border-focus",
    "hover:shadow-accent-blue",
    "focus:shadow-accent-blue",
    "hover:shadow-sm",
    "focus:shadow-sm",
    "transition-shadow",
    className,
  ];

  if (autoResize) classes.push("resize-none");

  if (maxHeight) classes.push("overflow-y-auto");
  else classes.push("overflow-hidden");

  useEffect(() => {
    if (!autoResize || !ref.current) return;
    ref.current.style.height = "auto";
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, [autoResize, value]);

  return (
    <textarea
      ref={ref}
      value={value}
      rows={rows}
      style={styles}
      className={classes.join(" ")}
      {...props}
    />
  );
}
