import js from "@eslint/js";
import globals from 'globals';
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      globals: {
        ...globals.browser,
        ...globals.nodeBuiltin
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "quotes": ["error", "double"],
      "jsx-quotes": ["error", "prefer-double"],
      "@typescript-eslint/quotes": ["error", "double"],
      // Add rules to replace command line flags
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      // "no-warning-comments": "error",
    },
  },
  {
    ignores: ["dist/**", "node_modules/**", "**/*.js", "**/*.mjs"],
  },
]; 