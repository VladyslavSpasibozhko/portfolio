import { useRef } from 'react';
import { useStarField } from './useStarField';

export function StarField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nebulaCanvasRef = useRef<HTMLCanvasElement>(null);

  useStarField({ containerRef, canvasRef, nebulaCanvasRef });

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-background-950"
    >
      <canvas ref={nebulaCanvasRef} className="absolute inset-0 h-full w-full" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
