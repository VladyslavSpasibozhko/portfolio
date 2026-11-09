import { config } from "@config";
import { messages } from "@portfolio/shared/errors";
import { httpSchemas } from "@portfolio/shared/schemas";
import { readFrames } from "./readFrames";
import type { StreamConfig, StreamBody, StreamOptions } from "./types";

function buildUrl(path: string): string {
  return new URL(path, config.apiUrl).toString();
}

function buildHeaders(headers?: StreamConfig["headers"]): HeadersInit {
  return { "Content-Type": "application/json", ...headers };
}

function buildBody<TBody>(body: TBody | undefined): string | undefined {
  return body !== undefined ? JSON.stringify(body) : undefined;
}

function isErrorResponse(data: unknown): data is httpSchemas.ErrorResponse {
  return httpSchemas.ErrorResponseSchema.validate(data);
}

export async function streamRequest<B extends StreamBody = StreamBody>(
  request: StreamConfig<B>,
  options: StreamOptions
): Promise<void> {
  const { signal, onError, onFrame } = options;

  try {
    const res = await fetch(buildUrl(request.path), {
      method: request.method,
      headers: buildHeaders(request.headers),
      body: buildBody(request.body),
      signal,
    });


    if (!res.ok) {
      try {
        const data: unknown = await res.json();
        if (isErrorResponse(data)) {
          onError(data.error.message);
          return;
        }

        throw Error(messages.ERROR_MESSAGES.UNKNOWN_ERROR);
      } catch {
        onError(messages.ERROR_MESSAGES.REQUEST_UNSUCCESSFUL);
      }

      return;
    }

    if (!res.body) {
      onError(messages.ERROR_MESSAGES.REQUEST_UNSUCCESSFUL);
      return;
    }

    await readFrames(res.body, onFrame);
  } catch {
    if (signal?.aborted) return;
    onError(messages.ERROR_MESSAGES.REQUEST_UNSUCCESSFUL);
  }
}
