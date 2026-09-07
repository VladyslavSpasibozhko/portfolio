import { useEffect, useRef } from 'react';
import tailwindConfig from '../../../tailwind.config';

function hexToRgb(hex: string): string {
  const value = hex.replace('#', '');
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

const patternColors = tailwindConfig.theme.extend.colors.pattern;

const PARTICLE_COLOR = `rgba(${hexToRgb(patternColors.particle)}, 0.6)`;
const LINE_COLOR_RGB = hexToRgb(patternColors.line);
const PULSE_COLOR_RGB = hexToRgb(patternColors.pulse);
const LINK_DISTANCE = 105;
const PULSE_DURATION_MS = 1000;
const PULSE_SPAWN_CHANCE = 0.01;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

interface Pulse {
  fromIndex: number;
  toIndex: number;
  elapsed: number;
}

export function BackgroundPattern() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let pulses: Pulse[] = [];
    let width = 0;
    let height = 0;
    let animationFrameId: number | null = null;
    let lastTime = 0;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    function seedParticles(w: number, h: number) {
      const count = Math.min(160, Math.max(60, Math.floor((w * h) / 5000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: 1.1 + Math.random() * 0.9,
      }));
      pulses = [];
    }

    function drawFrame(deltaMs: number, animate: boolean) {
      ctx!.clearRect(0, 0, width, height);

      if (animate) {
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x <= 0 || p.x >= width) p.vx *= -1;
          if (p.y <= 0 || p.y >= height) p.vy *= -1;
          p.x = Math.min(Math.max(p.x, 0), width);
          p.y = Math.min(Math.max(p.y, 0), height);
        }
      }

      const activeLinks: [number, number][] = [];
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            const alpha = Math.min(0.3, 0.3 * (1 - dist / LINK_DISTANCE));
            ctx!.strokeStyle = `rgba(${LINE_COLOR_RGB}, ${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
            activeLinks.push([i, j]);
          }
        }
      }

      for (const p of particles) {
        ctx!.fillStyle = PARTICLE_COLOR;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (animate) {
        if (activeLinks.length > 0 && Math.random() < PULSE_SPAWN_CHANCE) {
          const [fromIndex, toIndex] = activeLinks[Math.floor(Math.random() * activeLinks.length)];
          pulses.push({ fromIndex, toIndex, elapsed: 0 });
        }

        pulses = pulses.filter((pulse) => {
          pulse.elapsed += deltaMs;
          const t = pulse.elapsed / PULSE_DURATION_MS;
          if (t >= 1) return false;
          const from = particles[pulse.fromIndex];
          const to = particles[pulse.toIndex];
          if (!from || !to) return false;
          const x = from.x + (to.x - from.x) * t;
          const y = from.y + (to.y - from.y) * t;
          const fade = t < 0.5 ? t / 0.5 : (1 - t) / 0.5;
          ctx!.fillStyle = `rgba(${PULSE_COLOR_RGB}, ${fade})`;
          ctx!.beginPath();
          ctx!.arc(x, y, 1.8, 0, Math.PI * 2);
          ctx!.fill();
          return true;
        });
      }
    }

    function resize() {
      const rect = container!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedParticles(width, height);
      drawFrame(0, false);
    }

    function loop(time: number) {
      const deltaMs = lastTime ? time - lastTime : 16;
      lastTime = time;
      drawFrame(deltaMs, true);
      animationFrameId = requestAnimationFrame(loop);
    }

    function startLoop() {
      if (animationFrameId !== null) return;
      lastTime = 0;
      animationFrameId = requestAnimationFrame(loop);
    }

    function stopLoop() {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }

    function handleMotionChange() {
      if (reducedMotionQuery.matches) {
        stopLoop();
        drawFrame(0, false);
      } else {
        startLoop();
      }
    }

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    if (!reducedMotionQuery.matches) {
      startLoop();
    }
    reducedMotionQuery.addEventListener('change', handleMotionChange);

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      reducedMotionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
