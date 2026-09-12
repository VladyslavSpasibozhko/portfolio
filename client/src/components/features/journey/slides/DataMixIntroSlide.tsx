import { Typography } from "@components/atoms/Typography";
import { Badge } from "@components/atoms/Badge";
import { Icon, type IconName } from "@components/atoms/Icon";
import { JourneySection, JourneySectionBackground } from "../JourneySection";
import { Title } from "../Title";
import { SubTitle } from "../SubTitle";
import { Story } from "../Story";
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

interface DataMixIntroSlideProps {
  pageIndex: number;
}

export function DataMixIntroSlide({ pageIndex }: DataMixIntroSlideProps) {
  return (
    <JourneySection title="DataMix" current={pageIndex}>
      <div className="mt-4 md:mt-6 xl:mt-12 w-full md:w-2/3 xl:w-1/2">
        <Title content="The first time I understood that engineering is a team sport." />
        <SubTitle
          className="mt-2 sm:mt-4 md:mt-4 xl:mt-6"
          content="Frontend Engineer · October 2020 – December 2021"
        />
        <Story
          className="mt-2 sm:mt-4 md:mt-6 xl:mt-8"
          content="DataMix was my first outsourced experience and one of the first places where I felt a genuinely warm engineering team. That environment mattered. I learned how important it is to work with people who support and inspire each other."
        />
      </div>

      <div className="mt-4 md:mt-8 xl:mt-12">
        <SubTitle content="Multiple projects. Different domains." />
        <div className="mt-2 md:mt-4 flex flex-col justify-start items-start gap-2">
          {domains.map((domain) => (
            <Badge
              size="2xl"
              variant="primary"
              key={domain.label}
              className="flex items-center gap-2"
            >
              <div className="flex items-center justify-center">
                <Icon name={domain.icon} className="mr-2 text" size="lg" />
                {domain.label}
              </div>
            </Badge>
          ))}
        </div>
      </div>

      <Typography
        tag="p"
        className="mt-6 md:mt-8 xl:mt-12 italic text-text-400 w-1/2"
      >
        Not just writing code — but reviewing, supporting, refactoring,
        discussing architecture.
      </Typography>
      <JourneySectionBackground src={team_collaboration} />
    </JourneySection>
  );
}
