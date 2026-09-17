import { BorderedContainer } from "@components/atoms/BorderedContainer";
import { Typography } from "@components/atoms/Typography";
import { Icon, type IconName } from "@components/atoms/Icon";

export interface FlowStep {
  label: string;
  icon?: IconName;
}

interface FlowDiagramProps {
  steps: FlowStep[];
  className?: string;
}

export function FlowDiagram({ steps, className = "" }: FlowDiagramProps) {
  return (
    // Steps stack on smaller screens (arrows point down) and sit in a row from
    // `lg` up, where each box has room for its label.
    <div
      className={`flex flex-col lg:flex-row items-stretch gap-16 md:gap-14 xl:gap-16 w-full ${className}`}
    >
      {steps.map((step, index) => (
        <div
          key={step.label}
          className="flex min-w-0 flex-col lg:flex-row lg:flex-1 justify-center items-center gap-16 md:gap-14 lg:gap-22 xl:gap-24"
        >
          <BorderedContainer className="w-full lg:flex-1 lg:self-stretch min-w-0 flex flex-col justify-center items-center gap-8 md:gap-6 xl:gap-8">
            {step.icon && (
              <Icon name={step.icon} size="5xl" className="text-text-white" />
            )}
            <Typography tag="p" className="text-16 md:text-14 xl:text-20 text-center text-text-white">
              {step.label}
            </Typography>
          </BorderedContainer>
          {index < steps.length - 1 && (
            <Icon
              name="arrow-right"
              size="5xl"
              className="shrink-0 rotate-90 lg:rotate-0 text-text-white"
            />
          )}
        </div>
      ))}
    </div>
  );
}
