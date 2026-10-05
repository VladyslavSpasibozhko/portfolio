import { test } from "node:test";
import { strict as assert } from "node:assert";
import { validateCreateChatRequest } from "../createChat.js";

test("validateCreateChatRequest - extra field returns friendly message", () => {
  assert.throws(
    () => validateCreateChatRequest({ extra: true }),
    (err: Error) => {
      assert.match(err.message, /This endpoint does not accept any request body fields\./);
      assert.doesNotMatch(err.message, /additional properties/);
      return true;
    }
  );
});

test("validateCreateChatRequest - no body passes through", () => {
  const result = validateCreateChatRequest(undefined);
  assert.deepEqual(result, {});
});

test("validateCreateChatRequest - empty body passes through", () => {
  const result = validateCreateChatRequest({});
  assert.deepEqual(result, {});
});
