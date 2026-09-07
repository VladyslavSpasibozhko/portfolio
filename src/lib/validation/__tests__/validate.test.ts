import { test } from "node:test";
import { strict as assert } from "node:assert";
import { validate, type Schema } from "../index.js";

test("validate - valid data", () => {
  const schema: Schema = {
    type: "object",
    properties: {
      name: { type: "string" },
      age: { type: "number" },
    },
    required: ["name"],
    additionalProperties: false,
  };

  const result = validate({ name: "John", age: 30 }, schema);

  assert.equal(result.success, true);
  if (result.success) {
    assert.deepEqual(result.data, { name: "John", age: 30 });
  }
});

test("validate - missing required field", () => {
  const schema: Schema = {
    type: "object",
    properties: {
      name: { type: "string" },
    },
    required: ["name"],
    additionalProperties: false,
  };

  const result = validate({ age: 30 }, schema);

  assert.equal(result.success, false);
  if (!result.success) {
    assert(result.error.includes("name"));
  }
});

test("validate - wrong type", () => {
  const schema: Schema = {
    type: "object",
    properties: {
      age: { type: "number" },
    },
    required: ["age"],
    additionalProperties: false,
  };

  const result = validate({ age: "not a number" }, schema);

  assert.equal(result.success, false);
  if (!result.success) {
    assert(result.error.includes("number"));
  }
});

test("validate - with custom error messages", () => {
  const schema: Schema = {
    type: "object",
    properties: {
      age: { type: "number" },
    },
    required: ["age"],
    additionalProperties: false,
  };

  const customErrors = {
    root: "Invalid input",
  };

  const result = validate({ age: "not a number" }, schema, customErrors);

  assert.equal(result.success, false);
  if (!result.success) {
    assert(result.error.length > 0);
  }
});

test("validate - additional properties not allowed", () => {
  const schema: Schema = {
    type: "object",
    properties: {
      name: { type: "string" },
    },
    required: ["name"],
    additionalProperties: false,
  };

  const result = validate({ name: "John", extra: "field" }, schema);

  assert.equal(result.success, false);
  if (!result.success) {
    assert(result.error.length > 0);
  }
});

test("validate - nested objects", () => {
  const schema: Schema = {
    type: "object",
    properties: {
      user: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
        },
        required: ["name", "email"],
        additionalProperties: false,
      },
    },
    required: ["user"],
    additionalProperties: false,
  };

  const validData = { user: { name: "John", email: "john@example.com" } };
  const validResult = validate(validData, schema);
  assert.equal(validResult.success, true);

  const invalidData = { user: { name: "John" } };
  const invalidResult = validate(invalidData, schema);
  assert.equal(invalidResult.success, false);
});

test("validate - array validation", () => {
  const schema: Schema = {
    type: "object",
    properties: {
      tags: {
        type: "array",
        items: { type: "string" },
      },
    },
    required: ["tags"],
    additionalProperties: false,
  };

  const validResult = validate({ tags: ["a", "b", "c"] }, schema);
  assert.equal(validResult.success, true);

  const invalidResult = validate({ tags: ["a", 1, "c"] }, schema);
  assert.equal(invalidResult.success, false);
});
