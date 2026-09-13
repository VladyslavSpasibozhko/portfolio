import type { JourneyDiagramNode } from "@types";
import { DiagramNode } from "./DiagramNode";
import { DiagramRail } from "./DiagramRail";

// The gap the bracket spans. Drop lines are `inset-y-0` inside a box of
// exactly this height, so the bar and the drops can never drift apart.
const BRACKET_GAP = "h-48 md:h-64";

// The horizontal half of the bracket: the outer columns only reach inward, so
// the bar stops at the first and last drop instead of overhanging them.
function bracketClasses(index: number, total: number): string {
  if (total < 2) return "hidden";
  if (index === 0) return "left-1/2 right-0";
  if (index === total - 1) return "left-0 right-1/2";
  return "left-0 right-0";
}

interface BranchDiagramProps {
  source: JourneyDiagramNode;
  connector?: string;
  branches: JourneyDiagramNode[];
  sink?: JourneyDiagramNode;
  className?: string;
}

export function BranchDiagram({
  source,
  connector,
  branches,
  sink,
  className = "",
}: BranchDiagramProps) {
  return (
    <div className={`flex flex-col items-center w-full ${className}`}>
      <DiagramNode
        label={source.label}
        icon={source.icon}
        tone={source.tone ?? "accent"}
        className="w-full md:w-auto md:min-w-64"
      />

      <DiagramRail label={connector} />

      <div className="flex flex-col md:flex-row w-full">
        {branches.map((branch, index) => (
          <div
            key={`${branch.label}-${index}`}
            className="flex-1 flex flex-col items-center"
          >
            <div className={`relative w-full ${BRACKET_GAP}`}>
              <div
                className={`hidden md:block absolute top-0 h-px bg-border-focus ${bracketClasses(
                  index,
                  branches.length
                )}`}
              />
              <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border-focus" />
            </div>
            <DiagramNode
              label={branch.label}
              icon={branch.icon}
              tone={branch.tone}
              className="w-full md:w-auto"
            />
          </div>
        ))}
      </div>

      {sink && (
        <>
          {/* The mirrored bracket only means anything once the branches sit in
              a row; stacked on a phone a plain rail reads better. */}
          <div className="hidden md:flex w-full">
            {branches.map((branch, index) => (
              <div
                key={`${branch.label}-${index}`}
                className={`relative flex-1 ${BRACKET_GAP}`}
              >
                <div
                  className={`absolute bottom-0 h-px bg-border-focus ${bracketClasses(
                    index,
                    branches.length
                  )}`}
                />
                <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border-focus" />
              </div>
            ))}
          </div>

          {/* Carries the bar down into the sink on desktop, and stands in for
              the whole bracket on a phone. */}
          <DiagramRail />

          <DiagramNode
            label={sink.label}
            icon={sink.icon}
            tone={sink.tone ?? "result"}
            className="w-full md:w-auto md:min-w-64"
          />
        </>
      )}
    </div>
  );
}
