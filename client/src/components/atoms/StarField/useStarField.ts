import { useEffect, type RefObject } from 'react';

import {
  ANIMATION_START_TIMEOUT_MS,
  FRAME_INTERVAL_MS,
  MAX_DPR,
  SLOW_FRAME_GAP_MS,
  SLOW_FRAME_LIMIT,
} from './constants';
import { createHaloLayer, renderNebulaLayer } from './offscreen';
import { renderScene } from './render';
import { createScene } from './scene';
import type { HaloLayer, Scene, Size } from './types';

interface UseStarFieldParams {
  containerRef: RefObject<HTMLDivElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  nebulaCanvasRef: RefObject<HTMLCanvasElement | null>;
}

/** Runs `callback` once the page has loaded and the browser has a quiet moment. */
function whenIdle(callback: () => void): () => void {
  let idleId: number | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  function schedule() {
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(callback, { timeout: ANIMATION_START_TIMEOUT_MS });
      return;
    }
    timeoutId = setTimeout(callback, ANIMATION_START_TIMEOUT_MS);
  }

  if (document.readyState === 'complete') {
    schedule();
  } else {
    window.addEventListener('load', schedule, { once: true });
  }

  return () => {
    window.removeEventListener('load', schedule);
    if (idleId !== null) window.cancelIdleCallback(idleId);
    if (timeoutId !== null) clearTimeout(timeoutId);
  };
}

/** Owns the canvas lifecycle: sizing, scene seeding and the animation loop. */
export function useStarField({ containerRef, canvasRef, nebulaCanvasRef }: UseStarFieldParams): void {
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const nebulaCanvas = nebulaCanvasRef.current;
    if (!container || !canvas || !nebulaCanvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    let size: Size = { width: 0, height: 0 };
    let scene: Scene | null = null;
    let halo: HaloLayer | null = null;
    let animationFrameId: number | null = null;
    let lastTime = 0;
    let lastFrameTime = 0;
    /** Animation waits for the page to settle, and is dropped for good on a slow device. */
    let canAnimate = false;
    let slowFrames = 0;

    function draw(time: number, deltaMs: number, animate: boolean) {
      if (!scene || !halo) return;
      renderScene(ctx!, { scene, size, time, deltaMs, animate, halo });
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
      halo = createHaloLayer(size);
      renderNebulaLayer(nebulaCanvas!, scene.nebulas, size);
      draw(0, 0, false);
    }

    function stopLoop() {
      if (animationFrameId === null) return;
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }

    function loop(time: number) {
      animationFrameId = requestAnimationFrame(loop);

      if (time - lastFrameTime < FRAME_INTERVAL_MS) return;
      lastFrameTime = time;

      const deltaMs = lastTime ? time - lastTime : FRAME_INTERVAL_MS;
      lastTime = time;

      slowFrames = deltaMs > SLOW_FRAME_GAP_MS ? slowFrames + 1 : 0;
      if (slowFrames >= SLOW_FRAME_LIMIT) {
        canAnimate = false;
        stopLoop();
        draw(0, 0, false);
        return;
      }

      draw(time, deltaMs, true);
    }

    function startLoop() {
      if (animationFrameId !== null || !canAnimate) return;
      lastTime = 0;
      lastFrameTime = 0;
      slowFrames = 0;
      animationFrameId = requestAnimationFrame(loop);
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

    // const resizeObserver = new ResizeObserver(resize);
    // resizeObserver.observe(container);

    const cancelIdleStart = whenIdle(() => {
      canAnimate = true;
      if (!document.hidden) handleMotionChange();
    });
    // reducedMotionQuery.addEventListener('change', handleMotionChange);
    // document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopLoop();
      cancelIdleStart();
      // resizeObserver.disconnect();
      reducedMotionQuery.removeEventListener('change', handleMotionChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [containerRef, canvasRef, nebulaCanvasRef]);
}
