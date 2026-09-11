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
    <div className={`flex items-center gap-4 w-full ${className}`}>
      {steps.map((step, index) => (
        <div
          key={step.label}
          className="flex flex-1 justify-center items-center gap-6"
        >
          <BorderedContainer className="bg-transparent flex-1 flex flex-col justify-center items-center gap-2">
            {step.icon && (
              <Icon name={step.icon} size="5xl" className="text-text-white" />
            )}
            <Typography tag="p" className="text-20 text-text-white">
              {step.label}
            </Typography>
          </BorderedContainer>
          {index < steps.length - 1 && (
            <Icon name="arrow-right" size="5xl" className="text-text-white" />
          )}
        </div>
      ))}
    </div>
  );
}
