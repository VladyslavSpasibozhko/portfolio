import { BackgroundPattern } from "@components/atoms/BackgroundPattern";
import { Slider, type Slide } from "@components/molecules/Slider";
import journeyData from "@data/journey.json";
import type { JourneySection } from "@types";

const journey = journeyData as JourneySection[];

function Section(props: React.PropsWithChildren) {
  return (
    <div className={"h-full w-full flex items-center justify-center"}>
      <div className="w-1/2 p-20 rounded-2xl bg-dark-950/70 border border-gray-500">
        {props.children}
      </div>
    </div>
  );
}

function JourneySectionContent({ section }: { section: JourneySection }) {
  return (
    <Section>
      <span className="text-sm text-gray-500">{section.index}</span>
      <h2 className="text-3xl font-bold mt-2">{section.title}</h2>
      <p className="text-lg text-gray-300 mt-1">{section.tagline}</p>
      {section.subtitle && (
        <p className="text-sm text-gray-500 mt-2">{section.subtitle}</p>
      )}

      <div className="mt-6 flex flex-col gap-4">
        {section.body.map((block, i) => (
          <div key={i}>
            {block.heading && (
              <h3 className="text-xl font-semibold mb-2">{block.heading}</h3>
            )}
            {block.paragraphs.map((paragraph, j) => (
              <p key={j} className="text-gray-300 mb-2">
                {paragraph}
              </p>
            ))}
            {block.list && (
              <ul className="list-disc list-inside text-gray-300 mb-2">
                {block.list.map((item, k) => (
                  <li key={k}>{item}</li>
                ))}
              </ul>
            )}
            {block.diagram && (
              <pre className="text-gray-400 text-sm bg-black/30 rounded-lg p-4 overflow-x-auto mb-2">
                {block.diagram}
              </pre>
            )}
            {block.quote && (
              <blockquote className="border-l-2 border-gray-500 pl-4 italic text-gray-200 mt-2">
                {block.quote}
              </blockquote>
            )}
          </div>
        ))}
      </div>

      {section.transition && (
        <p className="mt-6 italic text-gray-400">{section.transition}</p>
      )}
    </Section>
  );
}

const slides: Slide[] = journey.map((section) => ({
  id: section.id,
  content: <JourneySectionContent section={section} />,
}));

export function MainPage() {
  return (
    <>
      <Slider slides={slides} />
      <BackgroundPattern />
    </>
  );
}
