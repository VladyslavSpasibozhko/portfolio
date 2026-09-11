import { Badge } from "@components/atoms/Badge";

interface BadgeRowProps {
  badges: string[];
}

export function BadgeRow({ badges }: BadgeRowProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => (
        <Badge size="2xl" variant="primary" key={badge}>
          {badge}
        </Badge>
      ))}
    </div>
  );
}
