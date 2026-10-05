import type { ErrorObject } from "ajv";
import type { ErrorsDictionary } from "./types.js";
import { normalizeInstancePath } from "./normalizePath.js";

export function getErrorMessage(
  errors: ErrorObject[] | null | undefined,
  customErrors?: ErrorsDictionary
): string {
  if (!errors?.length) return "Validation failed";

  return errors
    .map((err) => {
      const path = normalizeInstancePath(err.instancePath);
      return customErrors?.[path] || `${path} ${err.message}`;
    })
    .join("; ");
}
