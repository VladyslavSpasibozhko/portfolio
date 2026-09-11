import { Typography } from "@components/atoms/Typography";
import { Icon, type IconName } from "@components/atoms/Icon";
import { JourneySection } from "./JourneySection";

interface FeatureItem {
  icon: IconName;
  label: string;
}

const features: FeatureItem[] = [
  { icon: "user", label: "Patient management & CRM" },
  { icon: "shield-heart", label: "EHR integration" },
  { icon: "calendar-cursor", label: "Appointment scheduling" },
  { icon: "clipboard-check", label: "Medical documentation" },
];

export function RemedIntroSlide() {
  return (
    <JourneySection title="REMED" current={8}>
      <div className="w-2/3 space-y-4">
        <Typography tag="h1">When the frontend became a system.</Typography>
        <Typography tag="small" className="text-text-400">
          Frontend Engineer · December 2021 – August 2024
        </Typography>
        <Typography tag="p" className="text-text-300">
          REMED was a healthcare CRM with integration into Ukraine's national
          eHealth system and Helsi. I owned some of the most heavily used
          modules and worked closely with designers and backend developers.
        </Typography>
      </div>

      <div className="mt-10 space-y-3 w-1/2">
        <Typography tag="h4" className="text-text-blue">
          Key features
        </Typography>
        {features.map((feature) => (
          <div key={feature.label} className="flex items-center gap-3">
            <Icon name={feature.icon} size="sm" className="text-text-sky" />
            <Typography tag="span">{feature.label}</Typography>
          </div>
        ))}
      </div>
    </JourneySection>
  );
}
