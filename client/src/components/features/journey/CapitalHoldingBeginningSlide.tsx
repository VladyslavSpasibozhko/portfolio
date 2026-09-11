import { Typography } from "@components/atoms/Typography";
import { FlowDiagram } from "./FlowDiagram";
import { JourneySection } from "./JourneySection";
import { SubTitle } from "./SubTitle";
import { Story } from "./Story";

export function CapitalHoldingBeginningSlide() {
  return (
    <JourneySection title="Capital Holding" current={4}>
      <SubTitle content="Two projects. One beginning." />

      <div className="grid grid-cols-2 gap-10 mt-10 w-2/3">
        <div className="space-y-2">
          <Typography tag="h4" className="text-text-blue">
            Project 1 — Vanilla JavaScript
          </Typography>
          <Story content="I learned what happens under the hood — how the application is structured, how data flows, how the UI updates, and how different parts interact." />
        </div>
        <div className="space-y-2">
          <Typography tag="h4" className="text-text-blue">
            Project 2 — React + Redux
          </Typography>
          <Story content="I learned to understand more — why it worked, how Redux fit into the architecture, and how state should flow through the application." />
        </div>
      </div>

      <FlowDiagram
        className="mt-16"
        steps={[
          { label: "Backend", icon: "database" },
          { label: "API", icon: "settings" },
          { label: "Frontend", icon: "react" },
        ]}
      />
    </JourneySection>
  );
}
