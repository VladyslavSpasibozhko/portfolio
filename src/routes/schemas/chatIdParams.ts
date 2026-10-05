import type { Schema, ErrorsDictionary } from "../../lib/validation/index.js";

export const ChatIdParamsSchema: Schema = {
  type: "object",
  properties: { id: { type: "string", minLength: 1 } },
  required: ["id"],
  additionalProperties: false,
};

export const ChatIdParamsErrors: ErrorsDictionary = {
  root: "A chat id is required.",
  "/id": "Chat id must be a non-empty string.",
};
