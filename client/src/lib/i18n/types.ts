import type { Language } from "./languages";

export type Translations = Partial<Record<string, string>>;

export type TranslateParams = Partial<Record<string, string | number>>;

export interface TranslateOptions {
  params?: TranslateParams;
  language?: Language;
}
