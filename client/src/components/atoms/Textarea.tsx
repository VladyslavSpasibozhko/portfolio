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
  ...props
}: TextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const styles = {
    maxHeight: maxHeight ?? "auto",
  };

  const classes = [
    "px-2",
    "py-1",
    "border",
    "border-white/20",
    "rounded-lg",
    "text-white",
    "placeholder-gray-400",
    "focus:outline-none",
    "focus:ring-white",
    "focus:border-white",
    "disabled:bg-gray-800",
    "disabled:text-gray-500",
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
      style={styles}
      className={classes.join(" ")}
      {...props}
    />
  );
}
