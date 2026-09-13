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
  showFooter?: boolean;
}

export function JourneySlide({
  section,
  current,
  max,
  showFooter = true,
}: JourneySlideProps) {
  const background = getBackground(section.background);

  const width = background ? "w-full md:w-2/3 xl:w-[60%]" : "w-full";

  return (
    <JourneySection
      title={section.title}
      current={current}
      max={max}
      showFooter={showFooter}
      backgroundSrc={background}
    >
      <div className={`space-y-2 md:space-y-4 xl:space-y-6 ${width}`}>
        {section.eyebrow && (
          <Typography className="uppercase text-14 md:text-16 lg:text-20 xl:text-22 2xl:text-26 font-500 text-text-sky">
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
            key={`${section.id}-${index}`}
            className="mt-6 sm:mt-8 md:mt-12 lg:mt-14 xl:mt-18"
          >
            <JourneyBlock block={block} />
          </div>
        ))}
      </div>

      {section.links && (
        <div className="mt-6 sm:mt-8 md:mt-12 lg:mt-14 xl:mt-18 pt-2 md:pt-4 border-t border-border-highlight flex flex-wrap items-center gap-4 md:gap-8">
          {section.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2"
            >
              {isIconName(link.icon) && <Icon name={link.icon} size="md" />}
              <Typography tag="p" className="text-14 md:text-16 xl:text-20">
                {link.label}
              </Typography>
            </Link>
          ))}
        </div>
      )}

      {section.transition && (
        <Quote
          content={section.transition}
          className="mt-6 sm:mt-8 md:mt-12 lg:mt-14 xl:mt-18 italic"
        />
      )}
    </JourneySection>
  );
}
