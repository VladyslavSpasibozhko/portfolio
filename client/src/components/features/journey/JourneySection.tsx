import type { ReactNode } from "react";
import { Typography } from "@components/atoms/Typography";
import { Icon } from "@components/atoms/Icon";
import { padNumber } from "@utils/padNumber";

interface JourneySectionHeaderProps {
  max: number;
  current: number;
  title?: string;
}

function JourneySectionHeader({
  max,
  current,
  title = "",
}: JourneySectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <Typography className="uppercase text-16 sm:text-18 md:text-20 lg:text-22 xl:text-24 2xl:text-28 text-text-blue">
        {title}
      </Typography>
      <Typography className="capitalize text-16 sm:text-18 md:text-20 lg:text-22 xl:text-24 2xl:text-28 text-white">
        {padNumber(current)}/{padNumber(max)}
      </Typography>
    </div>
  );
}

function JourneySectionFooter() {
  return (
    <div className="py-4 px-8 sm:py-6 sm:px-10 md:py-10 md:px-10 xl:py-14 xl:px-14 2xl:px-24 absolute bottom-0 left-0 right-0">
      <div className="flex items-center animate-bounce">
        <div className="pr-2">
          <Icon
            size="xl"
            name="arrow-right-circle"
            className="rotate-90 text-text-sky"
          />
        </div>
        <Typography className="text-text-sky text-14 sm:text-16 md:text-18 lg:text-20">
          Scroll to explore
        </Typography>
      </div>
    </div>
  );
}

interface JourneySectionBackgroundProps {
  src: string;
}

// TODO: improve accessability
export function JourneySectionBackground({
  src,
}: JourneySectionBackgroundProps) {
  return (
    <div className="absolute bottom-0 top-0 left-0 right-0 -z-10">
      <img
        className="absolute right-0 h-full transform-[translate(40%,20%)]"
        src={src}
      />
    </div>
  );
}

interface JourneySectionProps {
  title: string;
  current: number;
  max?: number;
  showFooter?: boolean;
  children: ReactNode;
}

export function JourneySection({
  title,
  current,
  max = 12,
  showFooter = true,
  children,
}: JourneySectionProps) {
  return (
    <div className="overflow-hidden relative py-4 px-8 sm:py-6 sm:px-10 md:py-10 md:px-10 xl:py-14 xl:px-14 2xl:px-24 min-h-screen flex flex-col">
      <JourneySectionHeader title={title} max={max} current={current} />
      <div className="flex-1 pt-4 md:pt-8 xl:pt-12">{children}</div>
      {showFooter && <JourneySectionFooter />}
    </div>
  );
}
