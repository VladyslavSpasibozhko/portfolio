import { Typography } from "@components/atoms/Typography";
import { Icon, type IconName } from "@components/atoms/Icon";
import { Button } from "@components/atoms/Button";
import { Timeline, type TimelineItem } from "@components/molecules/Timeline";
import { JourneySection } from "./JourneySection";

const timelineItems: TimelineItem[] = [
  { year: "2019", title: "How do I", description: "build this?" },
  { year: "2020", title: "How should", description: "this feature work?" },
  { year: "2021", title: "Where should", description: "this logic live?" },
  { year: "2024", title: "How should", description: "these systems interact?" },
  { year: "Today", title: "How do we make", description: "this system easier to change?" },
];

const toolbox: IconName[] = [
  "react",
  "typescript",
  "nodejs",
  "redux",
  "graphql",
  "cypress",
  "angular",
  "javascript",
  "mobx",
];

export function BigPictureSlide() {
  return (
    <JourneySection title="The Big Picture" current={12} showFooter={false}>
      <Typography tag="h1">Looking back, the questions changed.</Typography>

      <Timeline items={timelineItems} className="mt-16" />

      <div className="mt-16 space-y-4">
        <Typography tag="h4" className="text-text-blue">
          The toolbox
        </Typography>
        <Typography tag="small" className="text-text-400">
          Technologies change. Problems don't.
        </Typography>
        <div className="flex gap-4 flex-wrap">
          {toolbox.map((icon) => (
            <div
              key={icon}
              className="w-48 h-48 rounded-lg border border-border-focus bg-background-700 flex items-center justify-center"
            >
              <Icon name={icon} size="sm" className="text-text-sky" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 flex items-center justify-between border-t border-border-subtle pt-8">
        <div className="space-y-2">
          <Typography tag="h3">Let's build something.</Typography>
        </div>
        <Button variant="primary" size="lg">
          <Icon name="arrow-right" size="sm" />
        </Button>
      </div>

      <div className="mt-8 flex gap-6 text-text-400">
        <Typography tag="small">Education</Typography>
        <Typography tag="small">Languages</Typography>
        <Typography tag="small">Contact</Typography>
      </div>
    </JourneySection>
  );
}
