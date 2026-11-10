import { config } from "@config";
import { codes, messages } from "@portfolio/shared/errors";
import { httpSchemas } from "@portfolio/shared/schemas";
import { httpUtils } from "@portfolio/shared/utils";
import type { FetchConfig, FetchResult, FetchBody, Method } from "./types";

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

function buildBody<B extends FetchBody = FetchBody>(method: Method, body: B | undefined): string | undefined {
  const nonBodyMethods: Method[] = ['GET'];
  if (nonBodyMethods.includes(method)) return undefined;


  if (!body) return JSON.stringify({});
  const isEmpty = Object.keys(body).length === 0;
  if (isEmpty) return JSON.stringify({});
  return JSON.stringify(body)
}

export async function request<T, B extends FetchBody = FetchBody>(request: FetchConfig<B>): Promise<FetchResult<T>> {
  try {
    const res = await fetch(buildUrl(request.path, request.query), {
      method: request.method,
      headers: buildHeaders(request.headers),
      body: buildBody(request.method, request.body),
    });

    const data = await res.json();
    const isValid = httpSchemas.ResponseSchema.validate(data);

    if (isValid) return data as FetchResult<T>;
    throw Error();
  } catch (e) {
    console.error(e);

    return httpUtils.createErrorResponse(
      httpUtils.createErrorDetails(
        codes.ERROR_CODES.NETWORK_ERROR,
        messages.ERROR_MESSAGES.REQUEST_UNSUCCESSFUL,
        500,
      ),
    );
  }
}
