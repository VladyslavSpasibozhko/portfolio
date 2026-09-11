import { InfoCard } from "./InfoCard";
import { JourneySection } from "./JourneySection";
import { Title } from "./Title";
import { SubTitle } from "./SubTitle";

export function RemedOwnershipSlide() {
  return (
    <JourneySection title="REMED" current={9}>
      <Title content="Ownership, architecture, and stability." />

      <div className="grid grid-cols-2 gap-6 mt-10">
        <InfoCard
          icon="education"
          title="High-load modules"
          description="Doctor Workplace, Cashier Workplace and Calendar."
        />
        <InfoCard
          icon="layers"
          title="Modular architecture"
          description="Services, components, data storage and API layers per business entity."
        />
        <InfoCard
          icon="lock-module"
          title="Cypress E2E testing"
          description="Focused on critical user journeys and high-load pages."
        />
        <InfoCard
          icon="code"
          title="Token refresh mechanism"
          description="Handled across multiple API clients with interceptors."
        />
        <InfoCard
          className="col-span-2"
          icon="shield-heart"
          title="Helsi integration"
          description="Connecting with Ukraine's national eHealth system."
        />
      </div>
    </JourneySection>
  );
}
