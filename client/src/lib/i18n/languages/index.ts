import type { Translations } from "../types";
import en from "./en.json";

export const LANGUAGES = {
  en,
} satisfies Record<string, Translations>;

export type Language = keyof typeof LANGUAGES;

export const DEFAULT_LANGUAGE: Language = "en";
