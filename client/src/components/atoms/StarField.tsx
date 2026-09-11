import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  vy: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  life: number;
  maxLife: number;
}

const STAR_COLOR = '248, 250, 252';
const SHOOTING_STAR_CHANCE_PER_MS = 0.00006;

// TODO: rename component
export function StarField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    let width = 0;
    let height = 0;
    let animationFrameId: number | null = null;
    let lastTime = 0;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    function seedStars(w: number, h: number) {
      const count = Math.min(320, Math.max(120, Math.floor((w * h) / 3500)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.4 + Math.random() * 1.3,
        baseAlpha: 0.3 + Math.random() * 0.7,
        twinkleSpeed: 0.0008 + Math.random() * 0.0018,
        twinklePhase: Math.random() * Math.PI * 2,
        vy: 0.004 + Math.random() * 0.01,
      }));
      shootingStars = [];
    }

    function spawnShootingStar() {
      const startX = Math.random() * width * 0.7;
      shootingStars.push({
        x: startX,
        y: Math.random() * height * 0.4,
        vx: 0.5 + Math.random() * 0.4,
        vy: 0.25 + Math.random() * 0.2,
        len: 60 + Math.random() * 60,
        life: 0,
        maxLife: 700 + Math.random() * 400,
      });
    }

    function drawFrame(time: number, deltaMs: number, animate: boolean) {
      ctx!.clearRect(0, 0, width, height);

      for (const s of stars) {
        if (animate) {
          s.y += s.vy;
          if (s.y > height) {
            s.y = 0;
            s.x = Math.random() * width;
          }
        }
        const twinkle = animate
          ? 0.5 + 0.5 * Math.sin(time * s.twinkleSpeed + s.twinklePhase)
          : 1;
        const alpha = s.baseAlpha * (0.4 + 0.6 * twinkle);
        ctx!.fillStyle = `rgba(${STAR_COLOR}, ${alpha})`;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (animate) {
        if (Math.random() < SHOOTING_STAR_CHANCE_PER_MS * deltaMs) {
          spawnShootingStar();
        }

        shootingStars = shootingStars.filter((star) => {
          star.life += deltaMs;
          star.x += star.vx * deltaMs;
          star.y += star.vy * deltaMs;
          const t = star.life / star.maxLife;
          if (t >= 1) return false;

          const fade = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;
          const tailX = star.x - star.vx * star.len;
          const tailY = star.y - star.vy * star.len;

          const gradient = ctx!.createLinearGradient(star.x, star.y, tailX, tailY);
          gradient.addColorStop(0, `rgba(${STAR_COLOR}, ${fade})`);
          gradient.addColorStop(1, `rgba(${STAR_COLOR}, 0)`);

          ctx!.strokeStyle = gradient;
          ctx!.lineWidth = 1.5;
          ctx!.beginPath();
          ctx!.moveTo(star.x, star.y);
          ctx!.lineTo(tailX, tailY);
          ctx!.stroke();

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
      seedStars(width, height);
      drawFrame(0, 0, false);
    }

    function loop(time: number) {
      const deltaMs = lastTime ? time - lastTime : 16;
      lastTime = time;
      drawFrame(time, deltaMs, true);
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
        drawFrame(0, 0, false);
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
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-background-950"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
