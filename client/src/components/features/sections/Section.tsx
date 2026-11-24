import { useId, type ReactNode } from "react";
import { Typography } from "@components/atoms/Typography";

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export function Section({ id, title, children }: SectionProps) {
  const headingId = useId();

  return (
    <section
      id={id}
      tabIndex={-1}
      aria-labelledby={headingId}
      className="flex flex-col gap-16 outline-none"
    >
      <Typography
        variant="caption"
        tag="h2"
        tone="accent"
        weight="bold"
        className="uppercase"
      >
        <span id={headingId}>{title}</span>
      </Typography>
      {children}
    </section>
  );
}
