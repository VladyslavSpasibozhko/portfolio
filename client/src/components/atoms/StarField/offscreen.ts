import { GLOW_SPRITE_SIZE, NEBULA_LAYER_SCALE } from './constants';
import type { Nebula, Size } from './types';

function rgba(color: string, alpha: number): string {
  return `rgba(${color}, ${alpha})`;
}

const glowSprites = new Map<string, HTMLCanvasElement>();

/**
 * A dot's halo is the same gradient for every dot of a color, so it is rasterized once
 * and stamped with `drawImage`. Blurring each dot per frame instead is what made the
 * canvas crawl — `drawImage` costs a fraction of a `shadowBlur` fill.
 */
export function getGlowSprite(color: string): HTMLCanvasElement {
  const cached = glowSprites.get(color);
  if (cached) return cached;

  const canvas = document.createElement('canvas');
  canvas.width = GLOW_SPRITE_SIZE;
  canvas.height = GLOW_SPRITE_SIZE;

  const ctx = canvas.getContext('2d');
  if (ctx) {
    const center = GLOW_SPRITE_SIZE / 2;
    const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
    gradient.addColorStop(0, rgba(color, 1));
    gradient.addColorStop(0.12, rgba(color, 0.8));
    gradient.addColorStop(0.28, rgba(color, 0.3));
    gradient.addColorStop(0.55, rgba(color, 0.08));
    gradient.addColorStop(1, rgba(color, 0));

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, GLOW_SPRITE_SIZE, GLOW_SPRITE_SIZE);
  }

  glowSprites.set(color, canvas);
  return canvas;
}

/**
 * Nebulas never move, so the haze is rendered once per resize. It is soft by nature, so
 * it is rasterized at a fraction of the viewport size and scaled up when drawn — that
 * cuts the fill cost of these full-screen gradients by an order of magnitude.
 */
export function createNebulaLayer(nebulas: Nebula[], size: Size): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(size.width * NEBULA_LAYER_SCALE));
  canvas.height = Math.max(1, Math.round(size.height * NEBULA_LAYER_SCALE));

  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.scale(NEBULA_LAYER_SCALE, NEBULA_LAYER_SCALE);
  ctx.globalCompositeOperation = 'lighter';

  for (const nebula of nebulas) {
    const gradient = ctx.createRadialGradient(
      nebula.x,
      nebula.y,
      0,
      nebula.x,
      nebula.y,
      nebula.radius,
    );
    gradient.addColorStop(0, rgba(nebula.color, nebula.alpha));
    gradient.addColorStop(0.55, rgba(nebula.color, nebula.alpha * 0.35));
    gradient.addColorStop(1, rgba(nebula.color, 0));

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  return canvas;
}
