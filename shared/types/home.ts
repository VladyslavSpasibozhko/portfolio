export interface Hero {
  eyebrow: string;
  name: string;
  tagline: string;
}

export interface ExperienceEntry {
  period: string;
  role: string;
  company: string;
  description: string;
}

export interface StackGroup {
  label: string;
  items: string[];
}

export interface SectionMeta {
  id: string;
  title: string;
}

export interface ExperienceContent extends SectionMeta {
  items: ExperienceEntry[];
}

export interface StackContent extends SectionMeta {
  groups: StackGroup[];
}

export interface Contact {
  label: string;
  href: string;
}

export interface HomeData {
  hero: Hero;
  experience: ExperienceContent;
  stack: StackContent;
  chat: SectionMeta;
  contacts: Contact[];
}
