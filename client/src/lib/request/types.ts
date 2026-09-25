import type { Response } from "@global-types/transport";

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";


export type FetchBody = FormData | Record<string, unknown>;

export interface FetchConfig<T extends FetchBody = {}> {
  path: string;
  method: Method;
  query?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
  body?: T;
}


export type FetchResult<T> = Response<T>;