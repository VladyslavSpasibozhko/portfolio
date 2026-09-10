export interface JourneySectionBlock {
    heading?: string;
    paragraphs: string[];
    quote?: string;
    diagram?: string;
    list?: string[];
}

export interface JourneySection {
    id: string;
    index: string;
    title: string;
    tagline: string;
    subtitle?: string;
    body: JourneySectionBlock[];
    visual?: string;
    transition?: string;
}
