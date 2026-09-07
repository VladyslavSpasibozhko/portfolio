import { getProfileData } from "../lib/api";
import { Typography } from "../components/atoms/Typography";
import { Badge } from "../components/atoms/Badge";
import { ChatWrapper } from "../components/features/chat/ChatWrapper";
import { BackgroundPattern } from "../components/shared/BackgroundPattern";
import { TechStack } from "../components/features/profile/technical-stack/TechStack";
import { Experience } from "../components/features/profile/experience/Experience";

export function MainPage() {
  const profile = getProfileData();
  const { personal } = profile;

  return (
    <main className="relative min-h-screen">
      <BackgroundPattern />

      <div className="relative z-10">
        <section className="px-6 pt-20 max-w-4xl mx-auto">
          <div className="mb-8">
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
          </div>

          <Typography tag="p" className="text-lg mb-8">
            {personal.intro}
          </Typography>
        </section>

        {/* Experience Section */}
        <section className="px-6 py-14 max-w-4xl mx-auto">
          <Typography tag="h2" className="mb-8">
            Experience
          </Typography>

          <Experience />
        </section>

        {/* Tech Stack Section */}
        <section className="px-6 py-14">
          <div className="max-w-4xl mx-auto">
            <Typography tag="h2" className="mb-8">
              Tech stack
            </Typography>

            <TechStack />
          </div>
        </section>

        {/* Chat Widget */}
        <ChatWrapper avatarUrl="/avatar.png" username="Assistant" />
      </div>
    </main>
  );
}
