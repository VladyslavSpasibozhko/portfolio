import type { ReactNode } from "react";
import { BorderedContainer } from "@components/atoms/BorderedContainer";
import { Typography } from "@components/atoms/Typography";
import { Icon, type IconName } from "@components/atoms/Icon";
import { Badge } from "@components/atoms/Badge";

interface InfoCardProps {
  icon?: IconName;
  title: string;
  description?: string;
  badges?: string[];
  children?: ReactNode;
  className?: string;
}

export function InfoCard({
  icon,
  title,
  description,
  badges,
  children,
  className = "",
}: InfoCardProps) {
  return (
    <BorderedContainer className={`flex flex-col gap-3 ${className}`}>
      {icon && (
        <div className="w-32 h-32 rounded-lg flex items-center justify-center border border-border-focus text-text-sky">
          <Icon name={icon} size="sm" />
        </div>
      )}
      <Typography tag="h4">{title}</Typography>
      {description && (
        <Typography tag="small" className="text-text-400">
          {description}
        </Typography>
      )}
      {children}
      {badges && badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {badges.map((badge) => (
            <Badge key={badge}>{badge}</Badge>
          ))}
        </div>
      )}
    </BorderedContainer>
  );
}
