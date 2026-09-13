import { hexToRgb } from '@utils/hexToRgb';

/** Palette mirrors the theme tokens, converted to `r, g, b` for canvas usage. */
export const COLOR_WHITE = hexToRgb('#f8fafc');
export const COLOR_BLUE = hexToRgb('#60a5fa');
export const COLOR_CYAN = hexToRgb('#22d3ee');
export const COLOR_SKY = hexToRgb('#0d95d1');

/** Node colors with their relative chance of being picked. */
export const NODE_COLORS = [
  { value: COLOR_BLUE, weight: 0.44 },
  { value: COLOR_WHITE, weight: 0.26 },
  { value: COLOR_CYAN, weight: 0.18 },
  { value: COLOR_SKY, weight: 0.12 },
];

export const NEBULA_COLORS = [COLOR_BLUE, COLOR_SKY];

/**
 * How dense the middle of the viewport is compared to the edges (1 — fully even).
 * Constellations cover the whole page, edges just stay slightly busier.
 */
export const CENTER_DENSITY = 0.65;
export const EDGE_FALLOFF = 1.4;

/** Constellations */
export const CLUSTER_AREA_PER_UNIT = 190000;
export const CLUSTER_COUNT_MIN = 3;
export const CLUSTER_COUNT_MAX = 9;
export const CLUSTER_RADIUS_MIN_RATIO = 0.24;
export const CLUSTER_RADIUS_MAX_RATIO = 0.45;

export const NODE_AREA_PER_UNIT = 9000;
export const NODE_COUNT_MIN = 60;
export const NODE_COUNT_MAX = 320;
export const NODE_RADIUS_MIN = 1.3;
export const NODE_RADIUS_MAX = 3.4;
/** Skews brightness towards the dim end — above 1 means most dots are faint. */
export const NODE_BRIGHTNESS_BIAS = 1.5;
/** Floor/range of a dot's opacity, so even the dimmest one stays readable. */
export const NODE_ALPHA_MIN = 0.65;
export const NODE_ALPHA_RANGE = 0.35;
/** Halo size relative to the dot, and how strongly it is stamped. */
export const NODE_GLOW_RATIO = 7;
export const NODE_GLOW_ALPHA = 1;
/** Resolution of the cached halo sprite. */
export const GLOW_SPRITE_SIZE = 96;

/** Links — drawn in two passes: a blurred halo plus a crisp core, for the lightning look. */
/** Only dots at least this bright can sit on a constellation. */
export const LINK_MIN_BRIGHTNESS = 0.45;

/**
 * Constellation paths: long chains that walk from dot to dot across the viewport. Every
 * line belongs to one — there are no short standalone links.
 */
export const PATH_AREA_PER_UNIT = 500000;
export const PATH_COUNT_MIN = 2;
export const PATH_COUNT_MAX = 5;
export const PATH_STEPS_MIN = 9;
export const PATH_STEPS_MAX = 18;
/** A path shorter than this is discarded whole rather than left as a few stray lines. */
export const PATH_MIN_DOTS = 8;
/** Tries per path before giving up — a walk can stall when it runs out of free dots. */
export const PATH_ATTEMPTS_PER_PATH = 4;
/** Step length as a share of the viewport's short side: allowed range and preferred. */
export const PATH_STEP_MIN_RATIO = 0.08;
export const PATH_STEP_MAX_RATIO = 0.34;
export const PATH_STEP_TARGET_RATIO = 0.22;
/** How strongly a step is penalised for turning away from the current heading. */
export const PATH_TURN_PENALTY = 0.9;
/** Paths read as the main figure, so their lines sit a little brighter. */
export const PATH_ALPHA_SCALE = 1.35;
/** How much brightness a constellation loses from its first line to its last. */
export const PATH_FADE_DEPTH = 0.75;
export const LINK_MAX_ALPHA = 0.85;
/**
 * Halo pass: every link is stroked as one batched path with a blur, so the whole web
 * gets a real shadow for the cost of a single blur operation per frame.
 */
export const LINK_HALO_WIDTH = 1;
export const LINK_HALO_ALPHA = 0.2;
export const LINK_HALO_BLUR = 6;
/** Brightness steps the halo is batched into, so it can follow the fade along a path. */
export const LINK_HALO_BUCKETS = 4;

/** Core passes: stacked strokes per link, widest/faintest first, additively blended. */
export const LINK_GLOW_LAYERS = [
  { width: 1.6, alpha: 0.12, white: false },
  { width: 0.8, alpha: 0.9, white: false },
  { width: 0.4, alpha: 0.45, white: true },
];
export const LINK_PULSE_SPEED_MIN = 0.0004;
export const LINK_PULSE_SPEED_MAX = 0.0011;
export const LINK_PULSE_DEPTH = 0.18;

/** Dust — the faint far-away stars filling the whole viewport. */
export const DUST_AREA_PER_UNIT = 4200;
export const DUST_COUNT_MIN = 90;
export const DUST_COUNT_MAX = 420;
export const DUST_RADIUS_MIN = 0.25;
export const DUST_RADIUS_MAX = 0.95;
export const DUST_ALPHA_MIN = 0.12;
export const DUST_ALPHA_MAX = 0.65;

/** Nebulas — soft colored haze sitting behind the clusters. */
export const NEBULA_RADIUS_RATIO = 1.45;
/** The haze is blurry, so it is rasterized small and scaled up on draw. */
export const NEBULA_LAYER_SCALE = 0.35;
export const NEBULA_ALPHA_MIN = 0.05;
export const NEBULA_ALPHA_MAX = 0.11;

/** Motion — the field drifts slowly, so a capped frame rate is imperceptible but much cheaper. */
export const FRAME_INTERVAL_MS = 1000 / 30;
/**
 * Fill cost scales with the square of this. A soft, blurry starfield has no fine detail
 * to lose, so it renders below native density — the link halo blurs the whole canvas
 * every frame, and that pass is what a high DPR makes expensive.
 */
export const MAX_DPR = 1.5;

export const DRIFT_RADIUS_MIN = 2;
export const DRIFT_RADIUS_MAX = 7;
export const DRIFT_SPEED_MIN = 0.00004;
export const DRIFT_SPEED_MAX = 0.00014;
export const TWINKLE_SPEED_MIN = 0.0005;
export const TWINKLE_SPEED_MAX = 0.0018;

/** Shooting stars */
export const SHOOTING_STAR_CHANCE_PER_MS = 0.00004;
export const SHOOTING_STAR_LENGTH_MIN = 70;
export const SHOOTING_STAR_LENGTH_MAX = 140;
export const SHOOTING_STAR_LIFE_MIN = 700;
export const SHOOTING_STAR_LIFE_MAX = 1100;
