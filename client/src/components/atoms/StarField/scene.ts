import {
  CENTER_DENSITY,
  CLUSTER_AREA_PER_UNIT,
  CLUSTER_COUNT_MAX,
  CLUSTER_COUNT_MIN,
  CLUSTER_RADIUS_MAX_RATIO,
  CLUSTER_RADIUS_MIN_RATIO,
  DRIFT_RADIUS_MAX,
  DRIFT_RADIUS_MIN,
  DRIFT_SPEED_MAX,
  DRIFT_SPEED_MIN,
  DUST_ALPHA_MAX,
  DUST_ALPHA_MIN,
  DUST_AREA_PER_UNIT,
  DUST_COUNT_MAX,
  DUST_COUNT_MIN,
  DUST_RADIUS_MAX,
  DUST_RADIUS_MIN,
  EDGE_FALLOFF,
  LINK_MAX_ALPHA,
  LINK_MIN_BRIGHTNESS,
  LINK_PULSE_SPEED_MAX,
  LINK_PULSE_SPEED_MIN,
  NEBULA_ALPHA_MAX,
  NEBULA_ALPHA_MIN,
  NEBULA_COLORS,
  NEBULA_RADIUS_RATIO,
  NODE_AREA_PER_UNIT,
  NODE_BRIGHTNESS_BIAS,
  NODE_COLORS,
  NODE_COUNT_MAX,
  NODE_COUNT_MIN,
  NODE_RADIUS_MAX,
  NODE_RADIUS_MIN,
  PATH_ALPHA_SCALE,
  PATH_AREA_PER_UNIT,
  PATH_ATTEMPTS_PER_PATH,
  PATH_COUNT_MAX,
  PATH_COUNT_MIN,
  PATH_FADE_DEPTH,
  PATH_MIN_DOTS,
  PATH_STEP_MAX_RATIO,
  PATH_STEP_MIN_RATIO,
  PATH_STEP_TARGET_RATIO,
  PATH_STEPS_MAX,
  PATH_STEPS_MIN,
  PATH_TURN_PENALTY,
  TWINKLE_SPEED_MAX,
  TWINKLE_SPEED_MIN,
} from './constants';
import { pickWeighted, randomBetween, randomBiased, randomGaussian } from './random';
import type {
  Cluster,
  ConstellationLink,
  ConstellationNode,
  DustStar,
  Nebula,
  Scene,
  Size,
} from './types';

function countFor(size: Size, areaPerUnit: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Math.round((size.width * size.height) / areaPerUnit)));
}

/**
 * Horizontal density weight: `CENTER_DENSITY` in the middle of the viewport, 1 at the
 * left/right edges. The field covers the full width — edges are only a bit busier.
 */
export function edgeWeight(x: number, width: number): number {
  const distance = Math.min(1, Math.abs(x / width - 0.5) * 2);
  return CENTER_DENSITY + (1 - CENTER_DENSITY) * Math.pow(distance, EDGE_FALLOFF);
}

function createClusters(size: Size): Cluster[] {
  const count = countFor(size, CLUSTER_AREA_PER_UNIT, CLUSTER_COUNT_MIN, CLUSTER_COUNT_MAX);

  return Array.from({ length: count }, (_, index) => {
    // Alternating halves keep the clusters evenly spread across the whole width.
    const side = index % 2 === 0 ? -1 : 1;
    const offset = randomBiased(0.85) * 1.1;

    return {
      x: size.width / 2 + (side * offset * size.width) / 2,
      y: randomBetween(-0.1, 1.1) * size.height,
      radius:
        randomBetween(CLUSTER_RADIUS_MIN_RATIO, CLUSTER_RADIUS_MAX_RATIO) *
        Math.max(size.height, size.width * 0.22),
    };
  });
}

function sampleClusterPoint(cluster: Cluster): { x: number; y: number } {
  return {
    x: cluster.x + randomGaussian() * cluster.radius,
    y: cluster.y + randomGaussian() * cluster.radius,
  };
}

function createNodes(size: Size, clusters: Cluster[]): ConstellationNode[] {
  const count = countFor(size, NODE_AREA_PER_UNIT, NODE_COUNT_MIN, NODE_COUNT_MAX);

  return Array.from({ length: count }, (_, index) => {
    const cluster = clusters[index % clusters.length];
    const brightness = randomBiased(NODE_BRIGHTNESS_BIAS);
    const point = sampleClusterPoint(cluster);

    return {
      homeX: point.x,
      homeY: point.y,
      radius: NODE_RADIUS_MIN + brightness * (NODE_RADIUS_MAX - NODE_RADIUS_MIN),
      color: pickWeighted(NODE_COLORS),
      brightness,
      driftRadius: randomBetween(DRIFT_RADIUS_MIN, DRIFT_RADIUS_MAX),
      driftSpeed: randomBetween(DRIFT_SPEED_MIN, DRIFT_SPEED_MAX),
      driftPhase: Math.random() * Math.PI * 2,
      twinkleSpeed: randomBetween(TWINKLE_SPEED_MIN, TWINKLE_SPEED_MAX),
      twinklePhase: Math.random() * Math.PI * 2,
    };
  });
}

/** Dots bright enough to sit at the end of a line — dim ones would look disconnected. */
function collectCandidates(nodes: ConstellationNode[]): number[] {
  return nodes.reduce<number[]>((accumulator, node, index) => {
    if (node.brightness >= LINK_MIN_BRIGHTNESS) accumulator.push(index);
    return accumulator;
  }, []);
}

function linkBetween(
  nodes: ConstellationNode[],
  from: number,
  to: number,
  distance: number,
  maxDistance: number,
  alphaScale: number,
): ConstellationLink {
  const proximity = 1 - distance / maxDistance;
  const brightness = (nodes[from].brightness + nodes[to].brightness) / 2;

  return {
    from,
    to,
    alpha: Math.min(1, proximity * LINK_MAX_ALPHA * (0.45 + 0.55 * brightness) * alphaScale),
    fadeFrom: 1,
    fadeTo: 1,
    pulseSpeed: randomBetween(LINK_PULSE_SPEED_MIN, LINK_PULSE_SPEED_MAX),
    pulsePhase: Math.random() * Math.PI * 2,
  };
}

/**
 * Walks from dot to dot to form one long constellation — the figure that carries the
 * composition. Each step prefers a far-ish dot that keeps roughly the current heading,
 * so the path strides across the screen instead of zig-zagging on the spot.
 */
function createPath(
  size: Size,
  nodes: ConstellationNode[],
  candidates: number[],
  used: Set<number>,
): ConstellationLink[] {
  const reach = Math.min(size.width, size.height);
  const minStep = reach * PATH_STEP_MIN_RATIO;
  const maxStep = reach * PATH_STEP_MAX_RATIO;
  const targetStep = reach * PATH_STEP_TARGET_RATIO;

  const free = candidates.filter((index) => !used.has(index));
  if (free.length === 0) return [];

  const links: ConstellationLink[] = [];
  const walked: number[] = [];
  const steps = Math.round(randomBetween(PATH_STEPS_MIN, PATH_STEPS_MAX));

  let current = free[Math.floor(Math.random() * free.length)];
  let headingX = Math.cos(Math.random() * Math.PI * 2);
  let headingY = Math.sin(Math.random() * Math.PI * 2);
  used.add(current);
  walked.push(current);

  for (let step = 0; step < steps; step++) {
    const node = nodes[current];
    let best = -1;
    let bestScore = Infinity;
    let bestDistance = 0;

    for (const to of candidates) {
      if (used.has(to)) continue;

      const dx = nodes[to].homeX - node.homeX;
      const dy = nodes[to].homeY - node.homeY;
      const distance = Math.hypot(dx, dy);
      if (distance < minStep || distance > maxStep) continue;

      // 0 when the step continues straight ahead, 1 when it doubles back.
      const turn = (1 - (dx * headingX + dy * headingY) / distance) / 2;
      const score =
        Math.abs(distance - targetStep) / maxStep + turn * PATH_TURN_PENALTY;

      if (score < bestScore) {
        bestScore = score;
        best = to;
        bestDistance = distance;
      }
    }

    if (best === -1) break;

    links.push(linkBetween(nodes, current, best, bestDistance, maxStep, PATH_ALPHA_SCALE));

    headingX = (nodes[best].homeX - node.homeX) / bestDistance;
    headingY = (nodes[best].homeY - node.homeY) / bestDistance;
    used.add(best);
    walked.push(best);
    current = best;
  }

  // A stunted path would look like the stray short lines we do not want, so it is
  // dropped whole and its dots are released back for the next attempt.
  if (walked.length < PATH_MIN_DOTS) {
    for (const index of walked) used.delete(index);
    return [];
  }

  // The constellation burns brightest where it starts and dims towards its tail.
  links.forEach((link, index) => {
    link.fadeFrom = 1 - PATH_FADE_DEPTH * (index / links.length);
    link.fadeTo = 1 - PATH_FADE_DEPTH * ((index + 1) / links.length);
  });

  return links;
}

function createDust(size: Size): DustStar[] {
  const count = countFor(size, DUST_AREA_PER_UNIT, DUST_COUNT_MIN, DUST_COUNT_MAX);
  const dust: DustStar[] = [];

  // Rejection sampling, bounded so a degenerate size can never spin forever.
  for (let attempt = 0; dust.length < count && attempt < count * 8; attempt++) {
    const x = Math.random() * size.width;
    if (Math.random() > edgeWeight(x, size.width)) continue;

    dust.push({
      x,
      y: Math.random() * size.height,
      radius: randomBetween(DUST_RADIUS_MIN, DUST_RADIUS_MAX),
      alpha: randomBetween(DUST_ALPHA_MIN, DUST_ALPHA_MAX),
      twinkleSpeed: randomBetween(TWINKLE_SPEED_MIN, TWINKLE_SPEED_MAX),
      twinklePhase: Math.random() * Math.PI * 2,
    });
  }

  return dust;
}

function createNebulas(clusters: Cluster[]): Nebula[] {
  return clusters.map((cluster, index) => ({
    x: cluster.x,
    y: cluster.y,
    radius: cluster.radius * NEBULA_RADIUS_RATIO,
    color: NEBULA_COLORS[index % NEBULA_COLORS.length],
    alpha: randomBetween(NEBULA_ALPHA_MIN, NEBULA_ALPHA_MAX),
  }));
}

export function createScene(size: Size): Scene {
  const clusters = createClusters(size);
  const nodes = createNodes(size, clusters);
  const candidates = collectCandidates(nodes);

  // Every line belongs to a long constellation; a dot is either on one or stands alone.
  const pathCount = countFor(size, PATH_AREA_PER_UNIT, PATH_COUNT_MIN, PATH_COUNT_MAX);
  const used = new Set<number>();
  const links: ConstellationLink[] = [];
  const maxAttempts = pathCount * PATH_ATTEMPTS_PER_PATH;
  let created = 0;

  for (let attempt = 0; created < pathCount && attempt < maxAttempts; attempt++) {
    const path = createPath(size, nodes, candidates, used);
    if (path.length === 0) continue;

    links.push(...path);
    created++;
  }

  return {
    nodes,
    links,
    dust: createDust(size),
    nebulas: createNebulas(clusters),
    shootingStars: [],
  };
}
