import type { JourneySection as JourneySectionData } from "@types";
import { Typography } from "@components/atoms/Typography";
import { Link } from "@components/atoms/Link";
import { Icon, isIconName } from "@components/atoms/Icon";
import { JourneySection } from "./JourneySection";
import { Headline } from "./Headline";
import { Title } from "./Title";
import { SubTitle } from "./SubTitle";
import { Quote } from "./Quote";
import { JourneyBlock } from "./blocks/JourneyBlock";
import { getBackground } from "./backgrounds";

interface JourneySlideProps {
  section: JourneySectionData;
  current: number;
  max: number;
}

export function JourneySlide({ section, current, max }: JourneySlideProps) {
  const background = getBackground(section.background);

  const width = background ? "w-full md:w-2/3 xl:w-[60%]" : "w-full";

  return (
    <JourneySection
      id={section.id}
      title={section.title}
      current={current}
      max={max}
      background={background}
    >
      <div
        className={`space-y-4 md:space-y-10 xl:space-y-14 3xl:space-y-18 ${width}`}
      >
        {section.eyebrow && (
          <Typography className="uppercase text-14 lg:text-18 xl:text-22 2xl:text-26 font-500 text-text-sky">
            {section.eyebrow}
          </Typography>
        )}
        {section.headline && <Headline content={section.headline} />}
        <Title content={section.tagline} />
        {section.subtitle && <SubTitle content={section.subtitle} />}
      </div>

      <div className={`${width}`}>
        {section.blocks.map((block, index) => (
          <div
            className="mt-8 md:mt-10 lg:mt-12 xl:mt-18 2xl:mt-26 3xl:mt-36"
            key={`${section.id}-${index}`}
          >
            <JourneyBlock block={block} />
          </div>
        ))}
      </div>

      {section.links && (
        <div className="mt-24 sm:mt-32 md:mt-46 lg:mt-54 xl:mt-72 pt-8 md:pt-14 xl:pt-16 border-t border-border-highlight flex flex-wrap items-center gap-16 md:gap-30 xl:gap-32">
          {section.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              // Web pages open in a new tab; `mailto:` hands off to the mail
              // app, so a blank tab would just be left behind.
              {...(link.href.startsWith("http") && {
                target: "_blank",
                rel: "noreferrer",
              })}
              className="flex items-center gap-8 md:gap-6 xl:gap-8"
            >
              {isIconName(link.icon) && <Icon name={link.icon} size="md" />}
              <Typography tag="p" className="text-14 xl:text-20">
                {link.label}
              </Typography>
            </Link>
          ))}
        </div>
      )}

      {section.transition && (
        <Quote
          content={section.transition}
          className="mt-14 sm:mt-16 md:mt-24 lg:mt-28 xl:mt-32 2xl:mt-40 3xl:mt-90 italic"
        />
      )}
    </JourneySection>
  );
}
