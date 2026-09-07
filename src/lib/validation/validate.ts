import Ajv from "ajv";
import type { ValidateFunction } from "ajv";
import type { Schema, ValidationResult, ErrorsDictionary } from "./types.js";
import { getErrorMessage } from "./getErrorMessage.js";

const ajv = new (Ajv as any)();

export function validate<T>(
  data: unknown,
  schema: Schema,
  customErrors?: ErrorsDictionary
): ValidationResult<T> {
  const validateSchema = ajv.compile(schema) as ValidateFunction;
  const isValid = validateSchema(data);

  if (!isValid) {
    const message = getErrorMessage(validateSchema.errors, customErrors);
    return { success: false, error: message } as const;
  }

  return { success: true, data: data as T } as const;
}
