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
    "rounded-lg",
    "focus:outline-none",
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
