import { Fragment } from "react";
import type { JourneyDiagramStep } from "@types";
import { DiagramNode } from "./DiagramNode";
import { DiagramRail } from "./DiagramRail";

export type StepsOrientation = "vertical" | "horizontal";

interface StepsDiagramProps {
  steps: JourneyDiagramStep[];
  orientation?: StepsOrientation;
  className?: string;
}

export function StepsDiagram({
  steps,
  orientation = "vertical",
  className = "",
}: StepsDiagramProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={`flex w-full ${
        isHorizontal
          ? "flex-col md:flex-row md:items-center"
          : "flex-col items-center"
      } ${className}`}
    >
      {steps.map((step, index) => (
        <Fragment key={`${step.label}-${index}`}>
          <DiagramNode
            label={step.label}
            icon={step.icon}
            tone={step.tone}
            className={
              isHorizontal ? "w-full md:flex-1" : "w-full md:w-auto md:min-w-64"
            }
          />

          {index < steps.length - 1 &&
            // A row of nodes can't fit on a phone, so a horizontal diagram
            // stacks and its connectors turn back to vertical.
            (isHorizontal ? (
              <>
                <div className="md:hidden w-full">
                  <DiagramRail bidirectional={step.bidirectional} />
                </div>
                <div className="hidden md:block shrink-0">
                  <DiagramRail
                    orientation="horizontal"
                    bidirectional={step.bidirectional}
                  />
                </div>
              </>
            ) : (
              <DiagramRail bidirectional={step.bidirectional} />
            ))}
        </Fragment>
      ))}
    </div>
  );
}
