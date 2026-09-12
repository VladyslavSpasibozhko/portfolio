import { useEffect, type RefObject } from 'react';

import { FRAME_INTERVAL_MS, MAX_DPR } from './constants';
import { createNebulaLayer } from './offscreen';
import { renderScene } from './render';
import { createScene } from './scene';
import type { Scene, Size } from './types';

interface UseStarFieldParams {
  containerRef: RefObject<HTMLDivElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

/** Owns the canvas lifecycle: sizing, scene seeding and the animation loop. */
export function useStarField({ containerRef, canvasRef }: UseStarFieldParams): void {
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    let size: Size = { width: 0, height: 0 };
    let scene: Scene | null = null;
    let backdrop: HTMLCanvasElement | null = null;
    let animationFrameId: number | null = null;
    let lastTime = 0;
    let lastFrameTime = 0;

    function draw(time: number, deltaMs: number, animate: boolean) {
      if (!scene) return;
      renderScene(ctx!, { scene, size, time, deltaMs, animate, backdrop });
    }

    function resize() {
      const rect = container!.getBoundingClientRect();
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);
      // ResizeObserver fires on sub-pixel changes too — reseeding then would be wasteful.
      if (width === size.width && height === size.height) return;
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      size = { width, height };
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      scene = createScene(size);
      backdrop = createNebulaLayer(scene.nebulas, size);
      draw(0, 0, false);
    }

    function loop(time: number) {
      animationFrameId = requestAnimationFrame(loop);

      if (time - lastFrameTime < FRAME_INTERVAL_MS) return;
      lastFrameTime = time;

      const deltaMs = lastTime ? time - lastTime : FRAME_INTERVAL_MS;
      lastTime = time;
      draw(time, deltaMs, true);
    }

    function startLoop() {
      if (animationFrameId !== null) return;
      lastTime = 0;
      lastFrameTime = 0;
      animationFrameId = requestAnimationFrame(loop);
    }

    function stopLoop() {
      if (animationFrameId === null) return;
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }

    function handleMotionChange() {
      if (reducedMotionQuery.matches) {
        stopLoop();
        draw(0, 0, false);
        return;
      }
      startLoop();
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        stopLoop();
        return;
      }
      handleMotionChange();
    }

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    handleMotionChange();
    reducedMotionQuery.addEventListener('change', handleMotionChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      reducedMotionQuery.removeEventListener('change', handleMotionChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [containerRef, canvasRef]);
}
