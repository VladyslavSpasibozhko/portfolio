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
    <div className={`flex items-center gap-4 flex-wrap ${className}`}>
      {steps.map((step, index) => (
        <div key={step.label} className="flex items-center gap-4">
          <BorderedContainer className="flex items-center gap-2">
            {step.icon && (
              <Icon name={step.icon} size="sm" className="text-text-sky" />
            )}
            <Typography tag="span">{step.label}</Typography>
          </BorderedContainer>
          {index < steps.length - 1 && (
            <Icon name="arrow-right" size="sm" className="text-text-blue" />
          )}
        </div>
      ))}
    </div>
  );
}
