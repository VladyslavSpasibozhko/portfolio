import type { Response } from "@types";

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface FetchConfig<T = unknown> {
  path: string;
  method: Method;
  query?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
  body?: T;
}

export type FetchBody = FormData | Record<string, unknown>;

export type FetchResult<T> = Response<T>;