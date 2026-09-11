import { Typography } from "@components/atoms/Typography";
import { Badge } from "@components/atoms/Badge";
import { FlowDiagram } from "./FlowDiagram";
import { JourneySection } from "./JourneySection";

export function WorkJamIntroSlide() {
  return (
    <JourneySection title="WorkJam" current={10}>
      <div className="w-2/3 space-y-4">
        <Typography tag="h1">When scale changes the rules.</Typography>
        <Typography tag="small" className="text-text-400">
          Frontend Engineer · March 2024 – July 2026
        </Typography>
        <Typography tag="p" className="text-text-300">
          Global workforce platform for enterprise clients. Multiple apps,
          legacy Angular, modern React & Next.js, shared packages,
          micro-frontends, monorepo and multiple teams.
        </Typography>
      </div>

      <div className="flex gap-3 mt-8 flex-wrap">
        <Badge size="lg">+10 apps & modules</Badge>
        <Badge size="lg">Nx monorepo</Badge>
        <Badge size="lg">React + Angular — legacy + modern</Badge>
        <Badge size="lg">Global users — enterprise scale</Badge>
      </div>

      <FlowDiagram
        className="mt-16"
        steps={[
          { label: "Legacy Angular", icon: "angular" },
          { label: "Shared Packages", icon: "layers" },
          { label: "Modern Next.js", icon: "react" },
        ]}
      />
    </JourneySection>
  );
}
