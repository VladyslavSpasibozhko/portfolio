import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import boundaries from "eslint-plugin-boundaries";
import importX from "eslint-plugin-import-x";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";

const allow = (from, to) => ({
  from: { element: { type: from } },
  allow: { to: { element: { types: { anyOf: to } } } },
});

export default tseslint.config(
  { ignores: ["dist", "node_modules", "client"] },
  {
    files: ["**/*.ts"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.node,
    },
  },
  {
    files: ["**/*.ts"],
    plugins: { boundaries, "import-x": importX },
    settings: {
      "import/resolver": { typescript: { project: "./tsconfig.json" } },
      "import-x/extensions": [".ts"],
      "import-x/resolver-next": [
        createTypeScriptImportResolver({ project: "./tsconfig.json" }),
      ],
      "boundaries/elements": [
        { type: "routes", pattern: "src/routes", partialMatch: false },
        { type: "plugins", pattern: "src/plugins", partialMatch: false },
        { type: "services", pattern: "src/services/*", partialMatch: false },
        { type: "storage", pattern: "src/storage", partialMatch: false },
        { type: "lib", pattern: "src/lib/*", partialMatch: false },
        { type: "config", pattern: "src/config", partialMatch: false },
        { type: "global-utils", pattern: "utils", partialMatch: false },
        { type: "global-types", pattern: "types", partialMatch: false },
      ],
    },
    rules: {
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          policies: [
            allow("routes", ["services", "lib", "config", "global-utils", "global-types"]),
            allow("plugins", ["lib", "config", "global-types"]),
            allow("services", ["storage", "lib", "global-utils", "global-types"]),
            allow("storage", ["lib", "global-types"]),
            allow("lib", ["config", "global-utils", "global-types"]),
            allow("global-utils", ["global-types"]),
            allow("global-types", ["global-types"]),
            {
              disallow: {
                to: { element: { type: "lib", fileInternalPath: "!index.ts" } },
              },
              message: "Import a lib only through its index file.",
            },
          ],
        },
      ],
      "import-x/no-cycle": "error",
    },
  },
  {
    files: ["**/*.ts"],
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
);
