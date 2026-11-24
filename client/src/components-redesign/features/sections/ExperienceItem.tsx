import { Typography } from "@components-redesign/atoms/Typography";

export interface Experience {
  period: string;
  role: string;
  company: string;
  description: string;
}

interface ExperienceItemProps {
  experience: Experience;
}

export function ExperienceItem({ experience }: ExperienceItemProps) {
  const { period, role, company, description } = experience;

  return (
    <li className="grid gap-4 tablet:grid-cols-[160px_1fr] tablet:gap-24 py-16 border-t border-border-default last:border-b">
      <Typography variant="caption" tag="span" weight="regular">
        {period}
      </Typography>
      <div className="flex flex-col gap-4">
        <Typography variant="body" tone="primary">
          <Typography variant="body" tag="span" tone="primary" weight="semibold">
            {role}
          </Typography>
          {` · ${company}`}
        </Typography>
        <Typography variant="small">{description}</Typography>
      </div>
    </li>
  );
}
