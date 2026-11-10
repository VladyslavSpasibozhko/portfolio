import path from "node:path";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import boundaries from "eslint-plugin-boundaries";
import importX from "eslint-plugin-import-x";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";

const FILES = ["**/*.ts"];
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
    regex: "^(@portfolio/server(/|$)|(\\.\\./)+server(/|$))",
    message: "This package can't import from the server package.",
  },
  {
    regex: "^(@portfolio/client(/|$)|(\\.\\./)+client(/|$))",
    message: "This package can't import from the client package.",
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
    languageOptions: { ecmaVersion: 2022, globals: globals["shared-node-browser"] },
    plugins: { boundaries, "import-x": importX },
    settings: {
      // Both resolvers are needed: boundaries reads `import/resolver`, import-x reads
      // `import-x/resolver-next`. Without `import/resolver` the boundaries rules silently pass.
      "import/resolver": { typescript: { project: tsconfig } },
      "import-x/extensions": [".ts"],
      "import-x/resolver-next": [createTypeScriptImportResolver({ project: tsconfig })],
      "boundaries/elements": [{ type: "shared", pattern: "*", partialMatch: false }],
    },
    rules: {
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          policies: [
            allow("shared", ["shared"]),
            {
              disallow: {
                to: { element: { type: "shared", fileInternalPath: "!index.ts" } },
              },
              message: "Import another shared folder only through its index file.",
            },
          ],
        },
      ],
      "import-x/no-cycle": "error",
    },
  },
  {
    files: FILES,
    rules: {
      "no-restricted-imports": ["error", { patterns: PACKAGE_IMPORT_PATTERNS }],
    },
  },
);
