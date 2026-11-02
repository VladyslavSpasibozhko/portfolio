import { DEFAULT_LANGUAGE, LANGUAGES, type Language } from "./languages";
import { interpolate } from "./interpolate";
import type { Translations, TranslateOptions } from "./types";

export function loadTranslations(language: Language = DEFAULT_LANGUAGE): Translations {
  return LANGUAGES[language];
}

export function translate(key: string, options: TranslateOptions = {}): string {
  const { params, language = DEFAULT_LANGUAGE } = options;
  const text = loadTranslations(language)[key] ?? key;
  if (!params) return text;
  return interpolate(text, params);
}
