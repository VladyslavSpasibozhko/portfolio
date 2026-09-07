import type { ErrorObject } from "ajv";
import type { ErrorsDictionary } from "./types.js";

export function getErrorMessage(
  errors: ErrorObject[] | null | undefined,
  customErrors?: ErrorsDictionary
): string {
  if (!errors?.length) return "Validation failed";

  return errors
    .map((err) => {
      const path = err.instancePath || "root";
      return customErrors?.[path] || `${path} ${err.message}`;
    })
    .join("; ");
}
