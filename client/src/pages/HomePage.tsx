import type { homeTypes } from "@portfolio/shared/types";
import homeData from "@portfolio/shared/data/home.json";
import { Typography } from "@components-redesign/atoms/Typography";
import { Link } from "@components-redesign/atoms/Link";
import {
  ExperienceSection,
  Section,
  StackSection,
} from "@components-redesign/features/sections";
import { Chat } from "@components-redesign/features/chat";
import { useFlags } from "@hooks/useFlags";

const content = homeData as homeTypes.HomeData;
const { hero, experience, stack, chat, contacts } = content;

export function HomePage() {
  const { flags } = useFlags();

  return (
    <div className="max-w-[760px] mx-auto px-16 tablet:px-24 py-48 tablet:py-80 flex flex-col gap-64">
      <header className="flex flex-col gap-16">
        <Typography variant="caption" tag="p" tone="secondary" weight="regular">
          {hero.eyebrow}
        </Typography>
        <Typography variant="h1">{hero.name}</Typography>
        <Typography variant="bodyLarge">{hero.tagline}</Typography>
      </header>

      <main className="flex flex-col gap-64">
        <ExperienceSection
          id={experience.id}
          title={experience.title}
          items={experience.items}
        />
        <StackSection id={stack.id} title={stack.title} groups={stack.groups} />
        {flags?.chatEnabled && (
          <Section id={chat.id} title={chat.title}>
            <Chat />
          </Section>
        )}
      </main>

      <footer>
        <nav className="flex flex-wrap gap-24">
          {contacts.map((contact) => (
            <Link key={contact.href} href={contact.href}>
              {contact.label}
            </Link>
          ))}
        </nav>
      </footer>
    </div>
  );
}
