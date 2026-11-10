import { test } from "node:test";
import assert from "node:assert/strict";
import { systemPrompt } from "./prompts.js";

test("systemPrompt instructs the model to always reply in Markdown", () => {
  assert.match(systemPrompt(), /Always reply in Markdown\./);
});
