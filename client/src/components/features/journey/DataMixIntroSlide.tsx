import { Typography } from "@components/atoms/Typography";
import { Icon, type IconName } from "@components/atoms/Icon";
import { JourneySection } from "./JourneySection";

interface DomainItem {
  icon: IconName;
  label: string;
}

const domains: DomainItem[] = [
  { icon: "bar-chart-trend", label: "Investment platform" },
  { icon: "ai-chat", label: "Social media platform" },
  { icon: "modular-book", label: "Company products" },
];

export function DataMixIntroSlide() {
  return (
    <JourneySection title="DataMix" current={6}>
      <div className="w-2/3 space-y-4">
        <Typography tag="h1">
          The first time I understood that engineering is a team sport.
        </Typography>
        <Typography tag="small" className="text-text-400">
          Frontend Engineer · October 2020 – December 2021
        </Typography>
        <Typography tag="p" className="text-text-300">
          DataMix was my first outsourced experience and one of the first
          places where I felt a genuinely warm engineering team. That
          environment mattered. I learned how important it is to work with
          people who support and inspire each other.
        </Typography>
      </div>

      <div className="mt-10 space-y-3">
        <Typography tag="h4" className="text-text-blue">
          Multiple projects. Different domains.
        </Typography>
        <div className="flex flex-col gap-3 w-1/2">
          {domains.map((domain) => (
            <div
              key={domain.label}
              className="flex items-center gap-3 p-4 rounded-lg border border-border-focus bg-background-700"
            >
              <Icon name={domain.icon} size="sm" className="text-text-sky" />
              <Typography tag="span">{domain.label}</Typography>
            </div>
          ))}
        </div>
      </div>

      <Typography tag="p" className="mt-8 italic text-text-400 w-1/2">
        Not just writing code — but reviewing, supporting, refactoring,
        discussing architecture.
      </Typography>
    </JourneySection>
  );
}
