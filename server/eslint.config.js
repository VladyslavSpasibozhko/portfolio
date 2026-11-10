import path from "node:path";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import boundaries from "eslint-plugin-boundaries";
import importX from "eslint-plugin-import-x";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";

const FILES = ["**/*.ts"];
const repoRoot = path.resolve(import.meta.dirname, "..");
const tsconfig = path.resolve(import.meta.dirname, "tsconfig.json");

// Boundaries policy: elements of type `from` may import elements of the `to` types.
const allow = (from, to) => ({
  from: { element: { type: from } },
  allow: { to: { element: { types: { anyOf: to } } } },
});

// Workspace package rules: blocked packages can't be imported by name or by a relative
// path that climbs into their folder; allowed packages are imported only by name.
const PACKAGE_IMPORT_PATTERNS = [
  {
    regex: "^(@portfolio/client(/|$)|(\\.\\./)+client(/|$))",
    message: "This package can't import from the client package.",
  },
  {
    regex: "^(\\.\\./)+shared(/|$)",
    message: "Import the shared package by name (@portfolio/shared/...), not by a relative path.",
  },
];

export default tseslint.config(
  { ignores: ["dist", "node_modules"] },
  {
    files: FILES,
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
  },
  {
    files: FILES,
    languageOptions: { ecmaVersion: 2022, globals: globals.node },
    plugins: { boundaries, "import-x": importX },
    settings: {
      // Both resolvers are needed: boundaries reads `import/resolver`, import-x reads
      // `import-x/resolver-next`. Without `import/resolver` the boundaries rules silently pass.
      "import/resolver": { typescript: { project: tsconfig } },
      "import-x/extensions": [".ts"],
      "import-x/resolver-next": [createTypeScriptImportResolver({ project: tsconfig })],
      "boundaries/root-path": repoRoot,
      "boundaries/elements": [
        { type: "routes", pattern: "server/src/routes", partialMatch: false },
        { type: "plugins", pattern: "server/src/plugins", partialMatch: false },
        { type: "services", pattern: "server/src/services/*", partialMatch: false, capture: ["folder"] },
        { type: "services", pattern: "server/src/services", partialMatch: false },
        { type: "storage", pattern: "server/src/storage", partialMatch: false },
        { type: "lib", pattern: "server/src/lib/*", partialMatch: false },
        { type: "config", pattern: "server/src/config", partialMatch: false },
        { type: "shared", pattern: "shared/*", partialMatch: false },
      ],
    },
    rules: {
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          policies: [
            allow("routes", ["services", "lib", "config", "shared"]),
            allow("plugins", ["lib", "config", "shared"]),
            allow("services", ["storage", "lib", "shared"]),
            allow("storage", ["lib", "shared"]),
            allow("config", ["shared"]),
            allow("lib", ["config", "shared"]),
            {
              disallow: {
                to: { element: { type: "lib", fileInternalPath: "!index.ts" } },
              },
              message: "Import a lib only through its index file.",
            },
            {
              disallow: {
                to: { element: { type: "services", captured: { folder: "*" }, fileInternalPath: "!index.ts" } },
              },
              message: "Import a folder service only through its index file.",
            },
          ],
        },
      ],
      "import-x/no-cycle": "error",
    },
  },
  {
    files: FILES,
    ignores: ["src/config/**"],
    rules: {
      "no-restricted-properties": [
        "error",
        {
          object: "process",
          property: "env",
          message: "Read process.env only in src/config/.",
        },
      ],
    },
  },
  {
    files: FILES,
    rules: {
      "no-restricted-imports": ["error", { patterns: PACKAGE_IMPORT_PATTERNS }],
    },
  },
);
