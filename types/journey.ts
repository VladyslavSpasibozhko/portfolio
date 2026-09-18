/**
 * Structure of `data/journey.json` — the single source of truth for the
 * journey slides. It carries both the copy and the presentation intent
 * (which blocks a slide is made of), so slides stay data-driven.
 *
 * Icon fields hold an icon name resolved by the client's icon registry.
 * They are plain strings here because the available icons are a client
 * concern; the client narrows and validates them when rendering.
 */

export interface JourneyBlockBase {
    heading?: string;
}

/** Prose: a few paragraphs, optionally landing on a highlighted line. */
export interface JourneyTextBlock extends JourneyBlockBase {
    type: 'text';
    paragraphs: string[];
    quote?: string;
}

/** A plain bulleted list of short items. */
export interface JourneyListBlock extends JourneyBlockBase {
    type: 'list';
    items: string[];
}

export interface JourneyBadge {
    label: string;
    icon?: string;
}

/** Pills — a tech stack, a set of domains, a list of features. */
export interface JourneyBadgesBlock extends JourneyBlockBase {
    type: 'badges';
    note?: string;
    layout?: 'row' | 'column' | 'grid';
    badges: JourneyBadge[];
}

export interface JourneyCard {
    icon?: string;
    title?: string;
    description?: string;
    detail?: string;
    badges?: string[];
    /** Span the full row instead of a single column. */
    wide?: boolean;
}

/** A grid of cards — projects, problems, principles. */
export interface JourneyCardsBlock extends JourneyBlockBase {
    type: 'cards';
    columns?: 1 | 2;
    cards: JourneyCard[];
}

export interface JourneyTimelineEntry {
    year: string;
    title: string;
    description: string;
    /** Turns the description into a link, e.g. `#whats-next`. */
    href?: string;
}

/** A horizontal progression across years. */
export interface JourneyTimelineBlock extends JourneyBlockBase {
    type: 'timeline';
    items: JourneyTimelineEntry[];
}

export interface JourneyFlowStep {
    label: string;
    icon?: string;
}

/** Steps connected by arrows, read left to right. */
export interface JourneyFlowBlock extends JourneyBlockBase {
    type: 'flow';
    steps: JourneyFlowStep[];
}

/** A row of technology icons. */
export interface JourneyIconsBlock extends JourneyBlockBase {
    type: 'icons';
    note?: string;
    icons: string[];
}

/** One emphasised takeaway, set apart from the surrounding prose. */
export interface JourneyCalloutBlock extends JourneyBlockBase {
    type: 'callout';
    icon?: string;
    text: string;
    /** A call to action shown after the text. */
    link?: JourneyLink;
}

/**
 * How a diagram node reads:
 * `legacy` is being retired, `accent` is the pivot of the story,
 * `result` is the outcome it lands on.
 */
export type JourneyDiagramTone = 'default' | 'legacy' | 'accent' | 'result';

export interface JourneyDiagramNode {
    label: string;
    icon?: string;
    tone?: JourneyDiagramTone;
}

export interface JourneyDiagramStep extends JourneyDiagramNode {
    /** Draw the connector below this step as a two-way link. */
    bidirectional?: boolean;
}

/**
 * A sequence of steps, each leading into the next. Defaults to reading top
 * to bottom; `horizontal` reads left to right and falls back to stacked on
 * narrow screens.
 */
export interface JourneyStepsBlock extends JourneyBlockBase {
    type: 'steps';
    orientation?: 'vertical' | 'horizontal';
    steps: JourneyDiagramStep[];
}

/** One source fanning out into branches, optionally converging on a sink. */
export interface JourneyBranchBlock extends JourneyBlockBase {
    type: 'branch';
    source: JourneyDiagramNode;
    /** Label riding the rail between source and branches, e.g. "Context". */
    connector?: string;
    branches: JourneyDiagramNode[];
    sink?: JourneyDiagramNode;
}

export type JourneyBlock =
    | JourneyTextBlock
    | JourneyListBlock
    | JourneyBadgesBlock
    | JourneyCardsBlock
    | JourneyTimelineBlock
    | JourneyFlowBlock
    | JourneyIconsBlock
    | JourneyCalloutBlock
    | JourneyStepsBlock
    | JourneyBranchBlock;

export interface JourneyLink {
    label: string;
    href: string;
    icon?: string;
}

export interface JourneySection {
    id: string;
    /** Two-digit chapter number, mirroring the headings in `journey.md`. */
    index: string;
    /** Shown in the slide header. */
    title: string;
    /** Small uppercase line above the headline. */
    eyebrow?: string;
    /** Oversized hero line — only the opening slide uses one. */
    headline?: string;
    tagline: string;
    subtitle?: string;
    /** Key into the client's background image registry. */
    background?: string;
    blocks: JourneyBlock[];
    links?: JourneyLink[];
    /** Closing line that hands over to the next section. */
    transition?: string;
}

export type JourneyData = JourneySection[];
