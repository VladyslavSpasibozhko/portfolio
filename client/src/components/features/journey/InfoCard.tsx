import type { ReactNode } from "react";
import { BorderedContainer } from "@components/atoms/BorderedContainer";
import { Typography } from "@components/atoms/Typography";
import { Icon, type IconName } from "@components/atoms/Icon";

type IconSize = NonNullable<Parameters<typeof Icon>[0]["size"]>;

interface InfoCardProps {
  icon?: IconName;
  iconSize?: IconSize;
  iconClassName?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function InfoCard({
  icon,
  iconSize = "4xl",
  iconClassName = "text-text-white",
  title,
  description,
  children,
  className = "",
}: InfoCardProps) {
  return (
    <BorderedContainer className={`w-full flex flex-col gap-1 md:gap-2 xl:gap-4 ${className}`}>
      {icon && (
        <div className="rounded-lg flex items-center justify-start">
          <Icon name={icon} size={iconSize} className={iconClassName} />
        </div>
      )}
      <Typography tag="h4" className="text-12 md:text-16 xl:text-20 2xl:text-26 text-text-100">
        {title}
      </Typography>
      {description && (
        <Typography tag="p" className="text-10 md:text-14 lg:text-16 xl:text-18 text-text-sky">
          {description}
        </Typography>
      )}
      {children}
    </BorderedContainer>
  );
}
