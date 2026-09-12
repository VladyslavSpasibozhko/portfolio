import { Typography } from "@components/atoms/Typography";
import { Icon, type IconName } from "@components/atoms/Icon";
import { Button } from "@components/atoms/Button";
import { Timeline, type TimelineItem } from "@components/molecules/Timeline";
import { JourneySection } from "../JourneySection";
import { Title } from "../Title";
import { SubTitle } from "../SubTitle";
import { BorderedContainer } from "@components/atoms/BorderedContainer";
import { Link } from "@components/atoms/Link";
import { IconButton } from "@components/molecules/IconButton";

const timelineItems: TimelineItem[] = [
  { year: "2019", title: "How do I", description: "build this?" },
  { year: "2020", title: "How should", description: "this feature work?" },
  { year: "2021", title: "Where should", description: "this logic live?" },
  { year: "2024", title: "How should", description: "these systems interact?" },
  {
    year: "Today",
    title: "How do we make",
    description: "this system easier to change?",
  },
];

const toolbox: IconName[] = [
  "javascript",
  "typescript",
  "nodejs",
  "react",
  "angular",
  // TODO: Redux is broken
  "redux",
  "mobx",
  "graphql",
  "cypress",
];

interface BigPictureSlideProps {
  pageIndex: number;
}

export function BigPictureSlide({ pageIndex }: BigPictureSlideProps) {
  return (
    <JourneySection title="The Big Picture" current={pageIndex} showFooter={false}>
      <Title content="Looking back, the questions changed." />

      <Timeline items={timelineItems} className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14" />

      <div className="mt-6 md:mt-8 xl:mt-12 space-y-2">
        <SubTitle content="The toolbox" />
        <Typography tag="p" className="text-text-400 italic text-10 sm:text-12 md:text-14 lg:text-16">
          Technologies change. Problems don't.
        </Typography>
        <div className="mt-4 sm:mt-6 md:mt-8 flex gap-2 flex-wrap">
          {toolbox.map((icon) => (
            <BorderedContainer
              key={icon}
              className="bg-transparent rounded-full!"
            >
              <Icon name={icon} size="5xl" className=" text-text-sky" />
            </BorderedContainer>
          ))}
        </div>
      </div>

      <div className="mt-4 md:mt-8 xl:mt-12 pt-2 md:pt-4 border-t border-border-highlight flex items-start">
        <Link className="flex items-center">
          <Typography tag="p" className="text-12 md:text-16 xl:text-20" >Let's build something.</Typography>
          {/* TODO: enchange accesability everywhere */}
          <IconButton
            size="3xl"
            icon="arrow-right-circle"
            aria-label="Open LinkedIn"
            className="text-text-white"
          />
        </Link>
      </div>
    </JourneySection>
  );
}
