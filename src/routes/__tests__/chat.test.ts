import { test } from "node:test";
import { strict as assert } from "node:assert";
import { validateChatRequest } from "../chat.js";

test("validateChatRequest - missing fields returns friendly message", () => {
  assert.throws(
    () => validateChatRequest({}),
    (err: Error) => {
      assert.match(err.message, /Request must include a message and a sessionId/);
      assert.doesNotMatch(err.message, /required property/);
      return true;
    }
  );
});

test("validateChatRequest - wrong type for message returns friendly message", () => {
  assert.throws(
    () => validateChatRequest({ message: 123, sessionId: "abc" }),
    (err: Error) => {
      assert.match(err.message, /Message must be text\./);
      assert.doesNotMatch(err.message, /must be string/);
      return true;
    }
  );
});

test("validateChatRequest - wrong type for sessionId returns friendly message", () => {
  assert.throws(
    () => validateChatRequest({ message: "hi", sessionId: 123 }),
    (err: Error) => {
      assert.match(err.message, /Session ID must be text\./);
      assert.doesNotMatch(err.message, /must be string/);
      return true;
    }
  );
});

test("validateChatRequest - extra field returns friendly message", () => {
  assert.throws(
    () => validateChatRequest({ message: "hi", sessionId: "abc", extra: true }),
    (err: Error) => {
      assert.match(err.message, /Request must include a message and a sessionId/);
      assert.doesNotMatch(err.message, /additional properties/);
      return true;
    }
  );
});

test("validateChatRequest - valid request passes through", () => {
  const result = validateChatRequest({ message: "hi", sessionId: "abc" });
  assert.deepEqual(result, { message: "hi", sessionId: "abc" });
});
