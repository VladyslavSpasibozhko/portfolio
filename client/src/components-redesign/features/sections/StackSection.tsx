import { Section } from "./Section";
import { StackRow, type StackGroup } from "./StackRow";

interface StackSectionProps {
  id: string;
  title: string;
  groups: StackGroup[];
}

export function StackSection({ id, title, groups }: StackSectionProps) {
  return (
    <Section id={id} title={title}>
      <dl className="flex flex-col gap-12">
        {groups.map((group) => (
          <StackRow key={group.label} group={group} />
        ))}
      </dl>
    </Section>
  );
}
