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
      <div className="w-full md:w-2/3 xl:w-1/2">
        <Title content="When scale changes the rules." />
        <SubTitle
          className="mt-2 md:mt-4 xl:mt-8"
          content="Frontend Engineer · March 2024 – July 2026"
        />
        <Story
          className="mt-4 md:mt-8 xl:mt-12"
          content="Global workforce platform for enterprise clients. Multiple apps, legacy Angular, modern React & Next.js, shared packages, micro-frontends, monorepo and multiple teams."
        />
      </div>

      <div className="grid grid-cols-4 gap-2 lg:gap-4 mt-4 sm:mt-6 md:mt-8 lg:mt-10 w-full">
        {stats.map((stat) => (
          <BorderedContainer className="bg-transparent" key={stat}>
            <Typography
              tag="p"
              className="text-10 sm:text-12 md:text-14 lg:text-16 text-text-white"
            >
              {stat}
            </Typography>
          </BorderedContainer>
        ))}
      </div>

      <FlowDiagram
        className="mt-4 sm:mt-6 md:mt-8 lg:mt-10"
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
