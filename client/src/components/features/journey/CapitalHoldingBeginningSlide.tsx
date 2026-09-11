import { Typography } from "@components/atoms/Typography";
import { FlowDiagram } from "./FlowDiagram";
import { JourneySection } from "./JourneySection";

export function CapitalHoldingBeginningSlide() {
  return (
    <JourneySection title="Capital Holding" current={4}>
      <Typography tag="h1">Two projects. One beginning.</Typography>

      <div className="grid grid-cols-2 gap-10 mt-10 w-2/3">
        <div className="space-y-2">
          <Typography tag="h4" className="text-text-blue">
            Project 1 — Vanilla JavaScript
          </Typography>
          <Typography tag="p" className="text-text-300">
            I learned what happens under the hood — how the application is
            structured, how data flows, how the UI updates, and how different
            parts interact.
          </Typography>
        </div>
        <div className="space-y-2">
          <Typography tag="h4" className="text-text-blue">
            Project 2 — React + Redux
          </Typography>
          <Typography tag="p" className="text-text-300">
            I learned to understand more — why it worked, how Redux fit into
            the architecture, and how state should flow through the
            application.
          </Typography>
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
