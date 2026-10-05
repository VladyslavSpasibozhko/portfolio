import { test } from "node:test";
import { strict as assert } from "node:assert";
import { validateDeleteChatParams } from "../deleteChat.js";

test("validateDeleteChatParams - missing id returns friendly message", () => {
  assert.throws(
    () => validateDeleteChatParams({}),
    (err: Error) => {
      assert.match(err.message, /A chat id is required\./);
      assert.doesNotMatch(err.message, /required property/);
      return true;
    }
  );
});

test("validateDeleteChatParams - empty string id returns friendly message", () => {
  assert.throws(
    () => validateDeleteChatParams({ id: "" }),
    (err: Error) => {
      assert.match(err.message, /Chat id must be a non-empty string\./);
      assert.doesNotMatch(err.message, /fewer than/);
      return true;
    }
  );
});

test("validateDeleteChatParams - wrong type for id returns friendly message", () => {
  assert.throws(
    () => validateDeleteChatParams({ id: 123 }),
    (err: Error) => {
      assert.match(err.message, /Chat id must be a non-empty string\./);
      assert.doesNotMatch(err.message, /must be string/);
      return true;
    }
  );
});

test("validateDeleteChatParams - valid id passes through", () => {
  const result = validateDeleteChatParams({ id: "abc" });
  assert.deepEqual(result, { id: "abc" });
});
