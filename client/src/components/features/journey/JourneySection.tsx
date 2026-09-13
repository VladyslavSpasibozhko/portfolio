import type { ReactNode } from "react";
import { Typography } from "@components/atoms/Typography";
import { padNumber } from "@utils/padNumber";
import type { BackgroundImage } from "./backgrounds";

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
      <Typography className="uppercase text-16 sm:text-18 lg:text-20 xl:text-24 2xl:text-28 text-text-blue">
        {title}
      </Typography>
      {/* The section's label already announces the position, and "01/05"
          would be read out as a fraction. */}
      <div aria-hidden="true">
        <Typography className="capitalize text-16 sm:text-18 lg:text-20 xl:text-24 2xl:text-28 text-white">
          {padNumber(current)}/{padNumber(max)}
        </Typography>
      </div>
    </div>
  );
}

// Mirror the `md` and `xl` breakpoints in index.css: below `xl` the image is
// dimmed, so smaller screens get lighter files.
const TABLET_MEDIA = "(min-width: 768px)";
const LAPTOP_MEDIA = "(min-width: 1280px)";

interface JourneySectionBackgroundProps {
  image?: BackgroundImage;
}

// The image is decorative, so it's hidden from assistive tech. It runs under
// the text column, so its left edge fades out and on narrower screens it's
// dimmed to stay behind the copy instead of competing with it.
function JourneySectionBackground({ image }: JourneySectionBackgroundProps) {
  return (
    <div className="absolute bottom-0 top-0 left-0 right-0 -z-10 overflow-hidden">
      {image && (
        // The browser takes the first source matching both media and type,
        // so wider screens come first and AVIF precedes WebP.
        <picture>
          <source media={LAPTOP_MEDIA} type="image/avif" srcSet={image.laptop.avif} />
          <source media={LAPTOP_MEDIA} type="image/webp" srcSet={image.laptop.webp} />
          <source media={TABLET_MEDIA} type="image/avif" srcSet={image.tablet.avif} />
          <source media={TABLET_MEDIA} type="image/webp" srcSet={image.tablet.webp} />
          <source type="image/avif" srcSet={image.mobile.avif} />
          <img
            className="absolute right-0 h-full transform-[translate(40%,20%)] mask-[linear-gradient(to_right,transparent,black_35%)]"
            src={image.mobile.webp}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </picture>
      )}
    </div>
  );
}

interface JourneySectionProps {
  /** Anchor target, so other slides can link here (e.g. `#whats-next`). */
  id?: string;
  title: string;
  current: number;
  max: number;
  children: ReactNode;
  background?: BackgroundImage;
}

export function JourneySection({
  id,
  title,
  current,
  max,
  children,
  background,
}: JourneySectionProps) {
  return (
    <section
      id={id}
      // Several slides share a company title, so the position keeps each
      // landmark's name unique.
      aria-label={`${title}, slide ${current} of ${max}`}
      // Lets hash navigation move focus onto the slide without adding it to
      // the tab order.
      tabIndex={-1}
      className="outline-none relative py-4 px-8 sm:py-6 sm:px-10 md:py-9.5 md:px-9.5 xl:py-14 xl:px-14 2xl:px-24 min-h-screen flex flex-col border-b border-border-highlight"
    >
      <JourneySectionHeader title={title} max={max} current={current} />
      <div className="flex-1 pt-4 md:pt-7.5 xl:pt-12">
        {children}
      </div>
      <JourneySectionBackground image={background} />
    </section>
  );
}
