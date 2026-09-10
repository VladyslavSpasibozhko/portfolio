import { BorderedContainer } from "@components/atoms/BorderedContainer";
import { Slider, type Slide } from "@components/molecules/Slider";
import journeyData from "@data/journey.json";
import type { JourneySection } from "@types";

const journey = journeyData as JourneySection[];

function Section(props: React.PropsWithChildren) {
  return (
    <div className={"h-full w-full flex items-center justify-center"}>
      <BorderedContainer className="w-1/2 p-20 rounded-2xl bg-dark-950/70 border">
        {props.children}
      </BorderedContainer>
    </div>
  );
}

function JourneySectionContent({ section }: { section: JourneySection }) {
  return (
    <Section>
      <span className="text-14">{section.index}</span>
      <h2 className="text-30 font-bold mt-2">{section.title}</h2>
      <p className="text-18 mt-1">{section.tagline}</p>
      {section.subtitle && <p className="text-14 mt-2">{section.subtitle}</p>}

      <div className="mt-6 flex flex-col gap-4">
        {section.body.map((block, i) => (
          <div key={i}>
            {block.heading && (
              <h3 className="text-20 font-semibold mb-2">{block.heading}</h3>
            )}
            {block.paragraphs.map((paragraph, j) => (
              <p key={j} className="mb-2">
                {paragraph}
              </p>
            ))}
            {block.list && (
              <ul className="list-disc list-inside mb-2">
                {block.list.map((item, k) => (
                  <li key={k}>{item}</li>
                ))}
              </ul>
            )}
            {block.diagram && (
              <pre className="text-14 rounded-lg p-4 overflow-x-auto mb-2">
                {block.diagram}
              </pre>
            )}
            {block.quote && (
              <blockquote className="border-l-2 pl-4 italic mt-2">
                {block.quote}
              </blockquote>
            )}
          </div>
        ))}
      </div>

      {section.transition && (
        <p className="mt-6 italic">{section.transition}</p>
      )}
    </Section>
  );
}

// const slides: Slide[] = journey.map((section) => ({
//   id: section.id,
//   content: <JourneySectionContent section={section} />,
// }));



export function MainPage() {
  return <></>;
}
