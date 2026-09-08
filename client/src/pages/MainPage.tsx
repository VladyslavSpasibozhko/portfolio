import { getProfileData } from "@lib/api";
import { Typography } from "@components/atoms/Typography";
import { Badge } from "@components/atoms/Badge";
import { ChatWrapper } from "@components/features/chat/ChatWrapper";
import { BackgroundPattern } from "@components/atoms/BackgroundPattern";
import { Slider, type Slide } from "@components/molecules/Slider";
import { TechStack } from "@components/features/profile/technical-stack/TechStack";
import { Experience } from "@components/features/profile/experience/Experience";
import { UseCaseCard } from "@components/features/profile/experience/UseCaseCard";

function Section(props: React.PropsWithChildren) {
  return (
    <div className={"h-full w-full flex items-center justify-center"}>
      <div className="w-1/2 p-20 rounded-2xl bg-dark-950/70 border border-gray-500">
        {props.children}
      </div>
    </div>
  );
}

export function MainPage() {
  const { personal, workExperience } = getProfileData();

  const builtSections = workExperience.map((experience) => {
    const experienceSection: Slide = {
      id: "experience-" + experience.company,
      content: (
        <Section>
          <Experience experience={experience} />
        </Section>
      ),
    };

    const useCasesSection: Slide | null = experience.useCases
      ? {
          id: "use-cases-" + experience.company,
          content: (
            <Section>
              <div className="space-y-6">
                {experience.useCases.map((useCase) => (
                  <UseCaseCard key={useCase.title} useCase={useCase} />
                ))}
              </div>
            </Section>
          ),
        }
      : null;

    return [experienceSection, useCasesSection].filter(
      (section): section is Slide => Boolean(section),
    );
  });

  return (
    <main className="relative min-h-screen">
      <BackgroundPattern />

      <Slider
        slides={[
          {
            id: "intro",
            content: (
              <Section>
                <div>
                  <div className="flex items-center gap-6 mb-8">
                    <div>
                      <Typography tag="h1" className="mb-2">
                        {personal.name}
                      </Typography>
                      <Typography
                        tag="span"
                        className="text-lg text-gray-300 block mb-2"
                      >
                        {personal.title}
                      </Typography>
                      <div className="flex items-center gap-4">
                        <Typography tag="span" className="text-gray-400">
                          {personal.currentLocation}
                        </Typography>
                        <Badge variant="success" className="px-2 py-1 text-sm">
                          Open to work
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Typography tag="p" className="text-lg mb-8">
                    {personal.intro}
                  </Typography>
                </div>
              </Section>
            ),
          },
          ...builtSections.flat(),
          {
            id: "tech-stack",
            content: (
              <Section>
                <Typography tag="h2" className="mb-8">
                  Tech stack
                </Typography>

                <TechStack />
              </Section>
            ),
          },
        ]}
      ></Slider>

      {/* Chat Widget */}
      <ChatWrapper avatarUrl="/avatar.png" username="Assistant" />
    </main>
  );
}
