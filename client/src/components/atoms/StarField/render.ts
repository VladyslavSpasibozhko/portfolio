import {
  COLOR_BLUE,
  COLOR_WHITE,
  LINK_GLOW_LAYERS,
  LINK_HALO_ALPHA,
  LINK_HALO_BLUR,
  LINK_HALO_WIDTH,
  LINK_PULSE_DEPTH,
  NODE_ALPHA_MIN,
  NODE_ALPHA_RANGE,
  NODE_GLOW_ALPHA,
  NODE_GLOW_RATIO,
  SHOOTING_STAR_CHANCE_PER_MS,
  SHOOTING_STAR_LENGTH_MAX,
  SHOOTING_STAR_LENGTH_MIN,
  SHOOTING_STAR_LIFE_MAX,
  SHOOTING_STAR_LIFE_MIN,
} from './constants';
import { getGlowSprite } from './offscreen';
import { randomBetween } from './random';
import { edgeWeight } from './scene';
import type { ConstellationNode, Scene, ShootingStar, Size } from './types';

interface NodePosition {
  x: number;
  y: number;
  alpha: number;
}

interface RenderFrame {
  scene: Scene;
  size: Size;
  time: number;
  deltaMs: number;
  animate: boolean;
  /** Pre-rendered nebula haze, drawn as the backdrop of every frame. */
  backdrop: HTMLCanvasElement | null;
}

function rgba(color: string, alpha: number): string {
  return `rgba(${color}, ${alpha})`;
}

function twinkleOf(
  item: { twinkleSpeed: number; twinklePhase: number },
  time: number,
  animate: boolean,
): number {
  if (!animate) return 1;
  return 0.5 + 0.5 * Math.sin(time * item.twinkleSpeed + item.twinklePhase);
}

/** Node positions are derived per frame from their home point plus a slow circular drift. */
function positionOf(node: ConstellationNode, time: number, animate: boolean): NodePosition {
  const angle = animate ? time * node.driftSpeed + node.driftPhase : node.driftPhase;
  const twinkle = twinkleOf(node, time, animate);

  return {
    x: node.homeX + Math.cos(angle) * node.driftRadius,
    y: node.homeY + Math.sin(angle) * node.driftRadius,
    alpha:
      NODE_ALPHA_MIN +
      NODE_ALPHA_RANGE * node.brightness * (0.55 + 0.45 * twinkle),
  };
}

function drawDust(
  ctx: CanvasRenderingContext2D,
  scene: Scene,
  time: number,
  animate: boolean,
): void {
  for (const star of scene.dust) {
    const twinkle = twinkleOf(star, time, animate);

    ctx.fillStyle = rgba(COLOR_WHITE, star.alpha * (0.45 + 0.55 * twinkle));
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * Blurred halo for the whole web. Every link goes into one path so the blur runs once
 * per frame instead of once per link — per-link blurring is what stalls the main thread.
 */
function drawLinkHalo(
  ctx: CanvasRenderingContext2D,
  scene: Scene,
  positions: NodePosition[],
): void {
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineCap = 'round';
  ctx.lineWidth = LINK_HALO_WIDTH;
  ctx.strokeStyle = rgba(COLOR_BLUE, LINK_HALO_ALPHA);
  ctx.shadowColor = rgba(COLOR_BLUE, 1);
  ctx.shadowBlur = LINK_HALO_BLUR;

  ctx.beginPath();
  for (const link of scene.links) {
    const from = positions[link.from];
    const to = positions[link.to];
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
  }
  ctx.stroke();

  ctx.restore();
}

/**
 * Lightning core: stacked strokes going from wide and faint to thin and bright, each
 * carrying its link's own alpha and pulse.
 */
function drawLinks(
  ctx: CanvasRenderingContext2D,
  scene: Scene,
  positions: NodePosition[],
  size: Size,
  time: number,
  animate: boolean,
): void {
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineCap = 'round';

  for (const layer of LINK_GLOW_LAYERS) {
    ctx.lineWidth = layer.width;
    ctx.strokeStyle = rgba(layer.white ? COLOR_WHITE : COLOR_BLUE, 1);

    for (const link of scene.links) {
      const from = positions[link.from];
      const to = positions[link.to];
      const pulse = animate
        ? 1 - LINK_PULSE_DEPTH * (0.5 + 0.5 * Math.sin(time * link.pulseSpeed + link.pulsePhase))
        : 1;

      ctx.globalAlpha =
        link.alpha *
        pulse *
        layer.alpha *
        Math.min(edgeWeight(from.x, size.width), edgeWeight(to.x, size.width));

      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    }
  }

  ctx.restore();
}

/** A solid dot plus a stamped halo sprite, additively blended so the dot reads as lit. */
function drawNodes(
  ctx: CanvasRenderingContext2D,
  scene: Scene,
  positions: NodePosition[],
  size: Size,
): void {
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';

  scene.nodes.forEach((node, index) => {
    const position = positions[index];
    const alpha = Math.min(1, position.alpha * edgeWeight(position.x, size.width));
    const glowRadius = node.radius * NODE_GLOW_RATIO * (0.5 + node.brightness);

    ctx.globalAlpha = alpha * NODE_GLOW_ALPHA;
    ctx.drawImage(
      getGlowSprite(node.color),
      position.x - glowRadius,
      position.y - glowRadius,
      glowRadius * 2,
      glowRadius * 2,
    );

    ctx.globalAlpha = alpha;
    ctx.fillStyle = rgba(node.color, 1);
    ctx.beginPath();
    ctx.arc(position.x, position.y, node.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.globalAlpha = 1;
  ctx.restore();
}

function spawnShootingStar(size: Size): ShootingStar {
  const fromLeft = Math.random() < 0.5;
  const speed = randomBetween(0.35, 0.6);

  return {
    x: fromLeft ? randomBetween(0, size.width * 0.3) : randomBetween(size.width * 0.7, size.width),
    y: randomBetween(0, size.height * 0.5),
    vx: fromLeft ? speed : -speed,
    vy: randomBetween(0.18, 0.32),
    length: randomBetween(SHOOTING_STAR_LENGTH_MIN, SHOOTING_STAR_LENGTH_MAX),
    life: 0,
    maxLife: randomBetween(SHOOTING_STAR_LIFE_MIN, SHOOTING_STAR_LIFE_MAX),
  };
}

function drawShootingStars(
  ctx: CanvasRenderingContext2D,
  scene: Scene,
  size: Size,
  deltaMs: number,
): void {
  if (Math.random() < SHOOTING_STAR_CHANCE_PER_MS * deltaMs) {
    scene.shootingStars.push(spawnShootingStar(size));
  }

  scene.shootingStars = scene.shootingStars.filter((star) => {
    star.life += deltaMs;
    star.x += star.vx * deltaMs;
    star.y += star.vy * deltaMs;

    const progress = star.life / star.maxLife;
    if (progress >= 1) return false;

    const fade = progress < 0.15 ? progress / 0.15 : 1 - (progress - 0.15) / 0.85;
    const tailX = star.x - star.vx * star.length;
    const tailY = star.y - star.vy * star.length;

    const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
    gradient.addColorStop(0, rgba(COLOR_WHITE, fade * 0.8));
    gradient.addColorStop(1, rgba(COLOR_WHITE, 0));

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(tailX, tailY);
    ctx.stroke();

    return true;
  });
}

export function renderScene(ctx: CanvasRenderingContext2D, frame: RenderFrame): void {
  const { scene, size, time, deltaMs, animate, backdrop } = frame;

  ctx.clearRect(0, 0, size.width, size.height);
  ctx.globalAlpha = 1;

  if (backdrop) {
    ctx.drawImage(backdrop, 0, 0, size.width, size.height);
  }

  const positions = scene.nodes.map((node) => positionOf(node, time, animate));

  drawDust(ctx, scene, time, animate);
  drawLinkHalo(ctx, scene, positions);
  drawLinks(ctx, scene, positions, size, time, animate);
  drawNodes(ctx, scene, positions, size);

  ctx.globalAlpha = 1;

  if (animate) {
    drawShootingStars(ctx, scene, size, deltaMs);
  }
}

export type { RenderFrame };
