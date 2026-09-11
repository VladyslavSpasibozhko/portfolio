import { Typography } from "@components/atoms/Typography";
import { Icon, type IconName } from "@components/atoms/Icon";
import { Button } from "@components/atoms/Button";
import { Timeline, type TimelineItem } from "@components/molecules/Timeline";
import { JourneySection } from "./JourneySection";
import { Title } from "./Title";
import { SubTitle } from "./SubTitle";
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

export function BigPictureSlide() {
  return (
    <JourneySection title="The Big Picture" current={12} showFooter={false}>
      <Title content="Looking back, the questions changed." />

      <Timeline items={timelineItems} className="mt-16" />

      <div className="mt-16 space-y-4">
        <SubTitle content="The toolbox" />
        <Typography tag="p" className="text-text-400 italic text-18">
          Technologies change. Problems don't.
        </Typography>
        <div className="mt-10 flex gap-4 flex-wrap">
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

      <div className="mt-16 pt-8 border-t border-border-highlight flex items-start">
        <Link className="flex items-center">
          <Typography tag="h3">Let's build something.</Typography>
          {/* TODO: enchange accesability everywhere */}
          <IconButton
            size="5xl"
            icon="arrow-right-circle"
            aria-label="Open LinkedIn"
            className="p-2 text-text-white"
          />
        </Link>
      </div>
    </JourneySection>
  );
}
