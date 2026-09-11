import { BorderedContainer } from "@components/atoms/BorderedContainer";
import { Typography } from "@components/atoms/Typography";
import { FlowDiagram } from "../FlowDiagram";
import { JourneySection } from "../JourneySection";
import { Title } from "../Title";
import { SubTitle } from "../SubTitle";
import { Story } from "../Story";

const stats = [
  "+10 apps & modules",
  "Nx monorepo",
  "React + Angular — legacy + modern",
  "Global users — enterprise scale",
];

interface WorkJamIntroSlideProps {
  pageIndex: number;
}

export function WorkJamIntroSlide({ pageIndex }: WorkJamIntroSlideProps) {
  return (
    <JourneySection title="WorkJam" current={pageIndex}>
      <div className="w-1/2">
        <Title content="When scale changes the rules." />
        <SubTitle className="mt-10" content="Frontend Engineer · March 2024 – July 2026" />
        <Story className="mt-20" content="Global workforce platform for enterprise clients. Multiple apps, legacy Angular, modern React & Next.js, shared packages, micro-frontends, monorepo and multiple teams." />
      </div>

      <div className="grid grid-cols-4 gap-6 mt-12 w-full">
        {stats.map((stat) => (
          <BorderedContainer className="bg-transparent" key={stat}>
            <Typography tag="p" className="text-18 text-text-white">{stat}</Typography>
          </BorderedContainer>
        ))}
      </div>

      <FlowDiagram
        className="mt-12"
        steps={[
          { label: "Angular", icon: "angular" },
          { label: "Shared Packages", icon: "layers" },
          // TODO: add next js
          { label: "Next.js", icon: "react" },
        ]}
      />
    </JourneySection>
  );
}
