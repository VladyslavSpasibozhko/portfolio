import path from "node:path";
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import boundaries from "eslint-plugin-boundaries";
import importX from "eslint-plugin-import-x";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";

const repoRoot = path.resolve(import.meta.dirname, "..");
const tsconfig = path.resolve(import.meta.dirname, "tsconfig.json");

const allow = (from, to) => ({
  from: { element: { type: from } },
  allow: { to: { element: { types: { anyOf: to } } } },
});

export default tseslint.config(
  { ignores: ["dist", "node_modules"] },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { boundaries, "import-x": importX },
    settings: {
      "import/resolver": { typescript: { project: tsconfig } },
      "import-x/extensions": [".ts", ".tsx"],
      "import-x/resolver-next": [
        createTypeScriptImportResolver({ project: tsconfig }),
      ],
      "boundaries/root-path": repoRoot,
      "boundaries/elements": [
        { type: "pages", pattern: "client/src/pages", partialMatch: false },
        {
          type: "features",
          pattern: "client/src/components/features/*",
          partialMatch: false,
        },
        {
          type: "molecules",
          pattern: "client/src/components/molecules",
          partialMatch: false,
        },
        {
          type: "atoms",
          pattern: "client/src/components/atoms/*",
          partialMatch: false,
        },
        { type: "hooks", pattern: "client/src/hooks", partialMatch: false },
        { type: "api", pattern: "client/src/api", partialMatch: false },
        { type: "lib", pattern: "client/src/lib/*", partialMatch: false },
        { type: "utils", pattern: "client/src/utils", partialMatch: false },
        { type: "global-utils", pattern: "utils", partialMatch: false },
        { type: "global-types", pattern: "types", partialMatch: false },
        { type: "data", pattern: "data", partialMatch: false },
      ],
      "boundaries/files": [
        { category: "config", pattern: "client/src/config.ts" },
      ],
    },
    rules: {
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          policies: [
            allow("pages", [
              "features",
              "molecules",
              "atoms",
              "hooks",
              "global-types",
              "data",
            ]),
            allow("features", [
              "molecules",
              "atoms",
              "hooks",
              "api",
              "lib",
              "utils",
              "global-utils",
              "global-types",
            ]),
            allow("molecules", ["atoms", "hooks", "utils", "global-types"]),
            allow("atoms", ["utils", "global-types"]),
            allow("hooks", ["api", "lib", "utils", "global-utils", "global-types"]),
            allow("api", ["lib", "global-utils", "global-types"]),
            allow("lib", ["utils", "global-utils", "global-types"]),
            allow("utils", ["global-utils", "global-types"]),
            allow("global-utils", ["global-types"]),
            allow("global-types", ["global-types"]),
            {
              from: { element: { type: "lib" } },
              allow: { to: { file: { categories: "config" } } },
            },
            {
              disallow: {
                to: { element: { type: "lib", fileInternalPath: "!index.{ts,tsx}" } },
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
    files: ["**/*.{ts,tsx}"],
    ignores: ["src/config.ts"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "MemberExpression[object.type='MetaProperty'][property.name='env']",
          message: "Read import.meta.env only in src/config.ts.",
        },
      ],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["src/lib/**"],
    rules: {
      "no-restricted-globals": [
        "error",
        { name: "fetch", message: "Call fetch only inside src/lib/." },
        { name: "EventSource", message: "Open connections only inside src/lib/." },
        { name: "WebSocket", message: "Open connections only inside src/lib/." },
      ],
    },
  },
  {
    files: ["src/api/**", "src/lib/**", "src/utils/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        { patterns: [{ group: ["react", "react-dom", "react/*"], message: "No React outside components, hooks and pages." }] },
      ],
    },
  },
);