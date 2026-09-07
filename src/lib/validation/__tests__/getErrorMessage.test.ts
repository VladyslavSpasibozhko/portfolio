import { test } from "node:test";
import { strict as assert } from "node:assert";
import { getErrorMessage } from "../getErrorMessage.js";
import type { ErrorObject } from "ajv";

test("getErrorMessage - no errors", () => {
  const message = getErrorMessage(undefined);
  assert.equal(message, "Validation failed");
});

test("getErrorMessage - null errors", () => {
  const message = getErrorMessage(null);
  assert.equal(message, "Validation failed");
});

test("getErrorMessage - empty errors array", () => {
  const message = getErrorMessage([]);
  assert.equal(message, "Validation failed");
});

test("getErrorMessage - single error with default message", () => {
  const errors: ErrorObject[] = [
    {
      instancePath: ".name",
      schemaPath: "#/properties/name/type",
      keyword: "type",
      params: { type: "string" },
      message: "must be string",
    },
  ];

  const message = getErrorMessage(errors);
  assert(message.includes(".name"));
  assert(message.includes("must be string"));
});

test("getErrorMessage - single error with custom message", () => {
  const errors: ErrorObject[] = [
    {
      instancePath: ".name",
      schemaPath: "#/properties/name/type",
      keyword: "type",
      params: { type: "string" },
      message: "must be string",
    },
  ];

  const customErrors = {
    ".name": "Name is required",
  };

  const message = getErrorMessage(errors, customErrors);
  assert.equal(message, "Name is required");
  assert(!message.includes("must be string"));
});

test("getErrorMessage - multiple errors mixed custom and default", () => {
  const errors: ErrorObject[] = [
    {
      instancePath: ".name",
      schemaPath: "#/properties/name/type",
      keyword: "type",
      params: { type: "string" },
      message: "must be string",
    },
    {
      instancePath: ".age",
      schemaPath: "#/properties/age/type",
      keyword: "type",
      params: { type: "number" },
      message: "must be number",
    },
  ];

  const customErrors = {
    ".name": "Custom name error",
  };

  const message = getErrorMessage(errors, customErrors);
  assert(message.includes("Custom name error"));
  assert(message.includes(".age"));
  assert(message.includes("must be number"));
});

test("getErrorMessage - root level error", () => {
  const errors: ErrorObject[] = [
    {
      instancePath: "",
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "object" },
      message: "must be object",
    },
  ];

  const message = getErrorMessage(errors);
  assert(message.includes("root"));
  assert(message.includes("must be object"));
});
