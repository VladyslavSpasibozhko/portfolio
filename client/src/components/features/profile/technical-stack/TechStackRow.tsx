import type { TechStackItem } from "@types";
import { Badge } from "@components/atoms/Badge";

export interface TechStackRowProps {
  items: TechStackItem[];
}

export function TechStackRow({ items }: TechStackRowProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((tech) => (
        <Badge key={tech.id} variant="primary">
          {tech.title}
        </Badge>
      ))}
    </div>
  );
}
