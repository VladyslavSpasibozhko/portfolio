import { test } from "node:test";
import { strict as assert } from "node:assert";
import { normalizeInstancePath } from "../normalizePath.js";

test("normalizeInstancePath - empty path is root", () => {
  assert.equal(normalizeInstancePath(""), "root");
});

test("normalizeInstancePath - top-level field drops leading slash", () => {
  assert.equal(normalizeInstancePath("/id"), "id");
});

test("normalizeInstancePath - nested field uses dot separator", () => {
  assert.equal(normalizeInstancePath("/address/city"), "address.city");
});
