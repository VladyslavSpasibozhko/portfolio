import { Typography } from "@components/atoms/Typography";
import { JourneySection } from "./JourneySection";

export function IntroSlide() {
  return (
    <JourneySection title="" current={1}>
      <div className="pt-24 w-1/2 space-y-20">
        <Typography className="uppercase text-30 font-500 text-text-sky">
          Frontend Engineer
        </Typography>
        <Typography className="text-60 font-500 text-text-100">
          Hi, I'm <span className="text-accent-violet">Vlad</span>.
        </Typography>
        <Typography className="text-32 text-text-100">
          I build frontend systems for products where things get complicated.
        </Typography>
        <Typography className="text-24 text-text-sky">
          Over the last 7+ years, I've worked across healthcare, fintech,
          social platforms and enterprise software — solving problems around
          architecture, state, performance, integrations and scale.
        </Typography>
        <Typography className="pt-20 text-32 text-text-100">
          This is the story behind the code.
        </Typography>
      </div>
    </JourneySection>
  );
}
