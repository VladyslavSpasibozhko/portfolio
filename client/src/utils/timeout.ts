export interface TimeoutOptions {
  delay: number;
  callback: () => void;
}

export function timeout({ callback, delay }: TimeoutOptions) {
  let startTime: number | null = null;
  let frameId: number;

  const cb = (time: number) => {
    if (startTime === null) startTime = time;

    const elapsed = time - startTime;

    if (elapsed >= delay) {
      callback();
      return;
    }

    frameId = requestAnimationFrame(cb);
  };

  frameId = requestAnimationFrame(cb);

  return () => cancelAnimationFrame(frameId);
}
