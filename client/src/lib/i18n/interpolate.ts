import type { TranslateParams } from "./types";

const PLACEHOLDER = /\{(\w+)\}/g;

export function interpolate(template: string, params: TranslateParams): string {
  return template.replace(PLACEHOLDER, (match, name: string) => {
    const value = params[name];
    if (value === undefined) return match;
    return String(value);
  });
}
