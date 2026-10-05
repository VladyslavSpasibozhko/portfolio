import { test } from "node:test";
import { strict as assert } from "node:assert";
import { validateGetChatMessagesParams } from "../getChatMessages.js";

test("validateGetChatMessagesParams - missing id returns friendly message", () => {
  assert.throws(
    () => validateGetChatMessagesParams({}),
    (err: Error) => {
      assert.match(err.message, /A chat id is required\./);
      assert.doesNotMatch(err.message, /required property/);
      return true;
    }
  );
});

test("validateGetChatMessagesParams - empty string id returns friendly message", () => {
  assert.throws(
    () => validateGetChatMessagesParams({ id: "" }),
    (err: Error) => {
      assert.match(err.message, /Chat id must be a non-empty string\./);
      assert.doesNotMatch(err.message, /fewer than/);
      return true;
    }
  );
});

test("validateGetChatMessagesParams - valid id passes through", () => {
  const result = validateGetChatMessagesParams({ id: "abc" });
  assert.deepEqual(result, { id: "abc" });
});
