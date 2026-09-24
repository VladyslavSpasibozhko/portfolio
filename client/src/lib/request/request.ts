import { config } from "@config";
import { createErrorResponse } from "@global-utils/transport";
import type { FetchConfig, FetchResult, FetchBody } from "./types";

function buildQuery(query: FetchConfig["query"] | null) {
  if (!query) return '';

  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) searchParams.set(key, String(value));
  }

  return searchParams.toString()
}

function buildUrl(path: string, query?: FetchConfig["query"]): string {
  const url = new URL(path, config.apiUrl);
  const search = buildQuery(query);
  if (search.length) url.search = search;

  return url.toString();
}

function buildHeaders(headers?: FetchConfig["headers"]): HeadersInit {
  return { "Content-Type": "application/json", ...headers };
}

function buildBody<B extends FetchBody = {}>(body: B | undefined): string | undefined {
  if (!body) return JSON.stringify({});
  const isEmpty = Object.keys(body).length === 0;
  if (isEmpty) return JSON.stringify({});
  return JSON.stringify(body)
}

export async function request<T, B extends FetchBody = {}>(request: FetchConfig<B>): Promise<FetchResult<T>> {
  try {
    const res = await fetch(buildUrl(request.path, request.query), {
      method: request.method,
      headers: buildHeaders(request.headers),
      body: buildBody(request.body),
    });

    const data = (await res.json()) as FetchResult<T>;
    return data;
  } catch (e) {
    return createErrorResponse({
      code: 500,
      message: e instanceof Error ? e.message : "Unknown error",
      reason: 'network_error'
    });
  }
}
