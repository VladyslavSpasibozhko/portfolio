import { Badge } from "@components/atoms/Badge";

interface BadgeRowProps {
  badges: string[];
}

export function BadgeRow({ badges }: BadgeRowProps) {
  return (
    // `role` restores list semantics that Safari drops once list styles are reset.
    <ul role="list" className="flex flex-wrap gap-2">
      {badges.map((badge, index) => (
        <li key={badge}>
          <Badge size="2xl" variant="primary" index={index}>
            {badge}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
