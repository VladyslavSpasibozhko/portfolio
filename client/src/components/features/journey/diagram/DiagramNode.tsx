import type { JourneyDiagramTone } from "@global-types/journey";
import { Typography } from "@components/atoms/Typography";
import { Icon, isIconName } from "@components/atoms/Icon";

// `legacy` reads as on its way out, `accent` carries the turning point of the
// story, `result` is where it lands.
const toneClasses: Record<JourneyDiagramTone, string> = {
  default: "border-border-DEFAULT bg-background-900",
  legacy: "border-dashed border-border-highlight bg-transparent",
  accent: "border-border-focus bg-background-800 shadow-md shadow-accent-cyan",
  result: "border-accent-green bg-background-800",
};

const toneTextClasses: Record<JourneyDiagramTone, string> = {
  default: "text-text-white",
  legacy: "text-text-200",
  accent: "text-text-100",
  result: "text-text-100",
};

interface DiagramNodeProps {
  label: string;
  icon?: string;
  tone?: JourneyDiagramTone;
  className?: string;
}

export function DiagramNode({
  label,
  icon,
  tone = "default",
  className = "",
}: DiagramNodeProps) {
  return (
    <div
      className={`inline-flex items-center justify-center gap-8 md:gap-6 xl:gap-8 rounded-lg border px-16 py-8 md:px-22 md:py-14 xl:px-24 xl:py-16 text-center ${toneClasses[tone]} ${className}`}
    >
      {isIconName(icon) && (
        <Icon name={icon} size="sm" className={toneTextClasses[tone]} />
      )}
      <Typography
        tag="p"
        className={`text-14 md:text-12 xl:text-16 ${toneTextClasses[tone]}`}
      >
        {label}
      </Typography>
    </div>
  );
}
