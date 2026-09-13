import codeCard1 from "@static/code_card_1.png";
import codeCard2 from "@static/code_card_2.png";
import crmDashboard from "@static/crm_dashboard.png";
import laptopCoding from "@static/laptop_coding.png";
import teamCollaboration from "@static/team_collaboration_2.png";

// `background` in data/journey.json holds one of these keys.
const backgrounds: Record<string, string> = {
  code_card_1: codeCard1,
  code_card_2: codeCard2,
  crm_dashboard: crmDashboard,
  laptop_coding: laptopCoding,
  team_collaboration_2: teamCollaboration,
};

export function getBackground(name: string | undefined): string | undefined {
  return name ? backgrounds[name] : undefined;
}
