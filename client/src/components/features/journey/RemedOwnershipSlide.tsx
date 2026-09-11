import { Typography } from "@components/atoms/Typography";
import { InfoCard } from "./InfoCard";
import { JourneySection } from "./JourneySection";

export function RemedOwnershipSlide() {
  return (
    <JourneySection title="REMED" current={9}>
      <Typography tag="h1">Ownership, architecture, and stability.</Typography>

      <div className="grid grid-cols-2 gap-6 mt-10 w-2/3">
        <InfoCard
          icon="user"
          title="High-load modules"
          description="Doctor Workplace, Cashier Workplace and Calendar."
        />
        <InfoCard
          icon="layers"
          title="Modular architecture"
          description="Services, components, data storage and API layers per business entity."
        />
        <InfoCard
          icon="cypress"
          title="Cypress E2E testing"
          description="Focused on critical user journeys and high-load pages."
        />
        <InfoCard
          icon="lock-module"
          title="Token refresh mechanism"
          description="Handled across multiple API clients with interceptors."
        />
      </div>

      <div className="mt-6 w-2/3">
        <InfoCard
          icon="shield-heart"
          title="Helsi integration"
          description="Connecting with Ukraine's national eHealth system."
        />
      </div>
    </JourneySection>
  );
}
