import { Typography } from "@components/atoms/Typography";
import { JourneySection, JourneySectionBackground } from "../JourneySection";
import { SubTitle } from "../SubTitle";
import { Story } from "../Story";
import card from "@static/code_card_1.png";

interface IntroSlideProps {
  pageIndex: number;
}

export function IntroSlide({ pageIndex }: IntroSlideProps) {
  return (
    <JourneySection title="" current={pageIndex}>
      <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-18 xl:mt-22 w-1/2 space-y-6 sm:space-y-8 md:space-y-12 lg:space-y-14 xl:space-y-18">
        <Typography className="uppercase text-14 sm:text-16 md:text-20 lg:text-24 xl:text-26 2xl:text-30 font-500 text-text-sky">
          Frontend Engineer
        </Typography>
        <Typography className="text-34 sm:text-38 md:text-44 lg:text-50 xl:text-56 2xl:text-70 font-700 text-text-100">
          {/* TODO: use Typography */}
          Hi, I'm <span className="text-accent-violet">Vlad</span>.
        </Typography>
        <SubTitle content="I build frontend systems for products where things get complicated." />
        <Story
          content="  Over the last 7+ years, I've worked across healthcare, fintech, social
          platforms and enterprise software — solving problems around
          architecture, state, performance, integrations and scale."
        />
        <SubTitle
          className="mt-6 sm:mt-8 md:mt-12 lg:mt-14 xl:mt-18"
          content="This is the story behind the code."
        />
      </div>
      <JourneySectionBackground src={card} />
    </JourneySection>
  );
}
