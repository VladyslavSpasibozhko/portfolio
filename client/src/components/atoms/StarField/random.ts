interface WeightedItem<T> {
  value: T;
  weight: number;
}

export function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/** Random value in [0, 1) skewed towards 0 when `bias` > 1, towards 1 when < 1. */
export function randomBiased(bias: number): number {
  return Math.pow(Math.random(), bias);
}

/** Approximated normal distribution centered at 0, roughly within [-1, 1]. */
export function randomGaussian(): number {
  return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
}

export function pickWeighted<T>(items: WeightedItem<T>[]): T {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  let threshold = Math.random() * total;

  for (const item of items) {
    threshold -= item.weight;
    if (threshold <= 0) return item.value;
  }

  return items[items.length - 1].value;
}
