import { config } from "@config";
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

export async function streamRequest<B extends StreamBody = {}>(
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

    if (!res.ok || !res.body) {
      throw Error('Request unsuccessful');
    }


    await readFrames(res.body, onFrame);
  } catch (e) {
    if (signal?.aborted) return;
    onError(e instanceof Error ? e.message : 'Unknown error!')
  }
}
