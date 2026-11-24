import { Section } from "./Section";
import { ExperienceItem, type Experience } from "./ExperienceItem";

interface ExperienceSectionProps {
  id: string;
  title: string;
  items: Experience[];
}

const toKey = (experience: Experience) =>
  `${experience.period}-${experience.company}`;

export function ExperienceSection({ id, title, items }: ExperienceSectionProps) {
  return (
    <Section id={id} title={title}>
      <ul>
        {items.map((experience) => (
          <ExperienceItem key={toKey(experience)} experience={experience} />
        ))}
      </ul>
    </Section>
  );
}
