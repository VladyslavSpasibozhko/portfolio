import type { FetchConfig } from "@lib/request";

export function getFlags(): FetchConfig {
  return { path: "/flags", method: "GET" };
}
