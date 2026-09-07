import type { TechStackCategory } from "@types";
import { getProfileData } from "@lib/api";
import { TechStackRowWithLabel } from "./TechStackRowWittLabel";

const TECH_CATEGORY_LABELS: Record<TechStackCategory, string> = {
  languages: "Languages",
  frameworks: "Frameworks & Libraries",
  styling: "Styling",
  cssPreprocessors: "CSS Preprocessors",
  dataFetching: "Data Fetching",
  stateManagement: "State Management",
  testing: "Testing",
  builder: "Builders",
  toolingAndBuild: "Tooling & Build",
};

const TECH_CATEGORY_ORDER: TechStackCategory[] = [
  "languages",
  "frameworks",
  "stateManagement",
  "dataFetching",
  "testing",
  "builder",
  "styling",
  "cssPreprocessors",
  "toolingAndBuild",
];

export interface TechStackProps {}

export function TechStack({}: TechStackProps) {
  const { techStack } = getProfileData();

  const stackByCategory = TECH_CATEGORY_ORDER.map((category) => ({
    category,
    items: techStack
      .filter((tech) => tech.category === category)
      .sort((a, b) => b.weight - a.weight),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="rounded-2xl p-6 space-y-6">
      {stackByCategory.map((group) => (
        <TechStackRowWithLabel
          key={group.category}
          label={TECH_CATEGORY_LABELS[group.category]}
          items={group.items}
        />
      ))}
    </div>
  );
}
