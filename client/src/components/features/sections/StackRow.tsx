import { Typography } from "@components/atoms/Typography";

export interface StackGroup {
  label: string;
  items: string[];
}

interface StackRowProps {
  group: StackGroup;
}

export function StackRow({ group }: StackRowProps) {
  return (
    <div className="grid gap-4 tablet:grid-cols-[160px_1fr] tablet:gap-24 tablet:items-baseline">
      <Typography variant="caption" tag="dt" weight="regular">
        {group.label}
      </Typography>
      <Typography variant="body" tag="dd" tone="primary">
        {group.items.join(" · ")}
      </Typography>
    </div>
  );
}
