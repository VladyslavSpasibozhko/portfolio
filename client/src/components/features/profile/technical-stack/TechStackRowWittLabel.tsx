import type { TechStackItem } from "@types";
import { Typography } from "@components/atoms/Typography";
import { TechStackRow } from "./TechStackRow";

export interface TechStackRowWithLabelProps {
  label: string;
  items: TechStackItem[];
}

export function TechStackRowWithLabel({
  label,
  items,
}: TechStackRowWithLabelProps) {
  return (
    <div>
      <Typography
        tag="small"
        className="mb-3 block uppercase tracking-wide"
      >
        {label}
      </Typography>
      <TechStackRow items={items} />
    </div>
  );
}
