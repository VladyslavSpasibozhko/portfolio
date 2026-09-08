export interface IntervalOptions {
  delay: number;
  callback: () => void;
}

export function interval({ callback, delay }: IntervalOptions) {
  let previousTime: number | null = null;
  let frameId: number;

  const cb = (time: number) => {
    if (!previousTime) previousTime = time;

    const elapsed = time - previousTime;
    const delayPassed = elapsed >= delay;

    if (delayPassed) {
      callback();
      previousTime = time;
    }

    start();
  };

  const start = () => {
    frameId = requestAnimationFrame(cb);
  };

  const stop = () => {
    cancelAnimationFrame(frameId);
  };

  start();
  return stop;
}
