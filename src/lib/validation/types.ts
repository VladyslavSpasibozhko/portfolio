export type Schema = Record<string, unknown>;
export type ErrorsDictionary = Record<string, string>;

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

