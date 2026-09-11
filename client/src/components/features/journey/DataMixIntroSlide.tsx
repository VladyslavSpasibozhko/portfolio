import { Typography } from "@components/atoms/Typography";
import { Badge } from "@components/atoms/Badge";
import { Icon, type IconName } from "@components/atoms/Icon";
import { JourneySection, JourneySectionBackground } from "./JourneySection";
import { Title } from "./Title";
import { SubTitle } from "./SubTitle";
import { Story } from "./Story";
import team_collaboration from "@static/team_collaboration_2.png";

interface DomainItem {
  icon: IconName;
  label: string;
}

const domains: DomainItem[] = [
  { icon: "bar-chart-trend", label: "Investment platform" },
  { icon: "camera", label: "Social media platform" },
  { icon: "modular-book", label: "Company products" },
];

export function DataMixIntroSlide() {
  return (
    <JourneySection title="DataMix" current={6}>
      <div className="pt-20 w-1/2">
        <Title content="The first time I understood that engineering is a team sport." />
        <SubTitle
          className="pt-8"
          content="Frontend Engineer · October 2020 – December 2021"
        />
        <Story
          className="pt-18"
          content="DataMix was my first outsourced experience and one of the first places where I felt a genuinely warm engineering team. That environment mattered. I learned how important it is to work with people who support and inspire each other."
        />
      </div>

      <div className="pt-20">
        <SubTitle content="Multiple projects. Different domains." />
        <div className="pt-6 flex flex-col justify-start items-start gap-4">
          {domains.map((domain) => (
            <Badge
              size="2xl"
              variant="primary"
              key={domain.label}
              className="flex items-center gap-2"
            >
              <div className="flex items-center justify-center">
                <Icon name={domain.icon} className="pr-2 text" size="lg" />
                {domain.label}
              </div>
            </Badge>
          ))}
        </div>
      </div>

      <Typography tag="p" className="mt-40 italic text-text-400 w-1/2">
        Not just writing code — but reviewing, supporting, refactoring,
        discussing architecture.
      </Typography>
      <JourneySectionBackground src={team_collaboration} />
    </JourneySection>
  );
}
