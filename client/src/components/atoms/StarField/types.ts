export interface Size {
  width: number;
  height: number;
}

export interface Cluster {
  x: number;
  y: number;
  radius: number;
}

export interface ConstellationNode {
  /** Position the node drifts around. */
  homeX: number;
  homeY: number;
  radius: number;
  color: string;
  /** 0 — barely visible dot, 1 — bright flare with spikes. */
  brightness: number;
  driftRadius: number;
  driftSpeed: number;
  driftPhase: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export interface ConstellationLink {
  from: number;
  to: number;
  alpha: number;
  /**
   * Brightness at each end, as a share of the link's alpha. A constellation starts at
   * full strength and fades along its course, so consecutive links hand off their
   * values — one link's `fadeTo` is the next one's `fadeFrom`.
   */
  fadeFrom: number;
  fadeTo: number;
  /** Slow brightness pulse running along the link. */
  pulseSpeed: number;
  pulsePhase: number;
}

export interface DustStar {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: string;
  alpha: number;
}

export interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  life: number;
  maxLife: number;
}

export interface Scene {
  nodes: ConstellationNode[];
  links: ConstellationLink[];
  dust: DustStar[];
  nebulas: Nebula[];
  shootingStars: ShootingStar[];
}
