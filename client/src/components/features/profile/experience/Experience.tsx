import { useState } from "react";
import type { TechStackItem, WorkExperience } from "@types";
import { getProfileData } from "@lib/api";
import { Typography } from "@components/atoms/Typography";
import { Button } from "@components/atoms/Button";
import { CompanyModal } from "@components/features/company/CompanyModal";
import { TechStackRow } from "@components/features/profile/technical-stack/TechStackRow";

export interface ExperienceProps {
  experience: WorkExperience;
}

export function Experience({ experience }: ExperienceProps) {
  const { techStack } = getProfileData();
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const techStackById = new Map<string, TechStackItem>(
    techStack.map((tech) => [tech.id, tech]),
  );

  return (
    <>
      <div className="rounded-2xl p-8 space-y-10">
        <div className="space-y-4">
          <div>
            <Typography tag="h3" className="text-base font-semibold">
              {experience.position} at{" "}
              <Button
                variant="inline"
                size="lg"
                onClick={() => setSelectedCompany(experience.company)}
                className="p-0!"
              >
                {experience.company}
              </Button>
            </Typography>
            <Typography tag="small" className="block mt-0.5">
              {experience.duration}
            </Typography>
          </div>

          <div className="space-y-2">
            <Typography tag="p" className="font-semibold">
              Responsibilities:
            </Typography>
            {experience.responsibilities.length > 0 && (
              <ul className="list-disc list-inside space-y-1">
                {experience.responsibilities.map((responsibility, idx) => (
                  <li key={idx}>
                    <Typography
                      tag="p"
                      className="inline-block text-sm text-gray-300"
                    >
                      {responsibility}
                    </Typography>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-2">
            <Typography tag="p" className="font-semibold">
              Tech Stack:
            </Typography>
            {experience.techStack && experience.techStack.length > 0 && (
              <TechStackRow
                items={experience.techStack
                  .map((id) => techStackById.get(id))
                  .filter((tech): tech is TechStackItem => Boolean(tech))
                  .sort((a, b) => b.weight - a.weight)}
              />
            )}
          </div>
        </div>
      </div>

      <CompanyModal
        companyName={selectedCompany}
        onClose={() => setSelectedCompany(null)}
      />
    </>
  );
}
