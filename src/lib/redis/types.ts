export interface Options {
  ttl: number; // seconds
}

export interface Storage {
  get<T>(key: string): Promise<T | null>;
  set<T extends Record<string, unknown>>(key: string, value: T, options: Options): Promise<void>;
  append<T>(key: string, path: string, values: T[]): Promise<void>;
  del(key: string): Promise<boolean>;
}
