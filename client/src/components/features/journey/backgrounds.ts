// Each background ships in three sizes, generated once from the originals in
// `client/static/source/`: `<name>-<screen>.<avif|webp>`.
const modules = import.meta.glob<string>("@static/backgrounds/*.{avif,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

// Keyed by file name, e.g. `laptop_coding-mobile.avif`.
const files = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => [path.split("/").pop(), url]),
);

export interface BackgroundSource {
  avif: string;
  webp: string;
}

export interface BackgroundImage {
  mobile: BackgroundSource;
  tablet: BackgroundSource;
  laptop: BackgroundSource;
}

interface GetSourceParams {
  name: string;
  screen: keyof BackgroundImage;
}

function getSource({ name, screen }: GetSourceParams): BackgroundSource {
  return {
    avif: files[`${name}-${screen}.avif`],
    webp: files[`${name}-${screen}.webp`],
  };
}

// `background` in data/journey.json holds the image name, e.g. `laptop_coding`.
export function getBackground(
  name: string | undefined,
): BackgroundImage | undefined {
  if (!name || !files[`${name}-laptop.avif`]) {
    return undefined;
  }

  return {
    mobile: getSource({ name, screen: "mobile" }),
    tablet: getSource({ name, screen: "tablet" }),
    laptop: getSource({ name, screen: "laptop" }),
  };
}
