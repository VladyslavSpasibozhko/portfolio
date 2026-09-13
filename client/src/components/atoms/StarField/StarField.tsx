import { useRef } from 'react';
import { useStarField } from './useStarField';

export function StarField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useStarField({ containerRef, canvasRef });

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-background-950"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
