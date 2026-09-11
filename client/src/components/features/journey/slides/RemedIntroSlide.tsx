import { Typography } from "@components/atoms/Typography";
import { Icon, type IconName } from "@components/atoms/Icon";
import { Badge } from "@components/atoms/Badge";
import { JourneySection, JourneySectionBackground } from "../JourneySection";
import { Title } from "../Title";
import { SubTitle } from "../SubTitle";
import { Story } from "../Story";
import crm_dashboard from "@static/crm_dashboard.png";

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

interface RemedIntroSlideProps {
  pageIndex: number;
}

export function RemedIntroSlide({ pageIndex }: RemedIntroSlideProps) {
  return (
    <JourneySection title="REMED" current={pageIndex}>
      <div className="w-1/2">
        <Title content="When the frontend became a system." />
        <SubTitle
          className="mt-8"
          content=" Frontend Engineer · December 2021 – August 2024"
        />
        <Story
          className="mt-16"
          content="REMED was a healthcare CRM with integration into Ukraine's national eHealth system and Helsi. I owned some of the most heavily used modules and worked closely with designers and backend developers."
        />
      </div>

      <div className="mt-10 space-y-3 w-1/2">
        <Typography tag="h4" className="uppercase text-20 text-text-blue">
          Key features
        </Typography>
        <div className="mt-12 flex flex-col justify-start items-start gap-6">
          {features.map((feature) => (
            <Badge key={feature.label} variant="primary" size="lg">
              <div className="flex items-center">
                <Icon
                  name={feature.icon}
                  size="lg"
                  className="pr-2 text-text-white"
                />
                {feature.label}
              </div>
            </Badge>
          ))}
        </div>
      </div>
      <JourneySectionBackground src={crm_dashboard} />
    </JourneySection>
  );
}
