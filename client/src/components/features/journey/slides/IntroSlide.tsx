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
      <div className="mt-24 w-1/2 space-y-20">
        <Typography className="uppercase text-30 font-500 text-text-sky">
          Frontend Engineer
        </Typography>
        <Typography className="text-70 font-700 text-text-100">
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
          className="mt-20"
          content="This is the story behind the code."
        />
      </div>
      <JourneySectionBackground src={card} />
    </JourneySection>
  );
}
