import pluginReact from "eslint-plugin-react";

import eslintPluginPrettier from "eslint-plugin-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

import pluginJs from "@eslint/js";
import eslintParser from "@typescript-eslint/parser";

const appTsConfigPathCopy = {};

/** @type {import('eslint').Linter.Config[]} */
const eslintConf = [
  { languageOptions: { globals: globals.browser } },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: eslintParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.es2024,
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },

    rules: {
      "prettier/prettier": "error",
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      [pluginJs.meta.name]: pluginJs.configs.recommended,
    },

    rules: {
      camelcase: "error",
      "no-console": "warn",
    },
  },
  {
    files: ["**/*.{jsx,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: pluginReact.configs.all.parserOptions.ecmaFeatures,
      },
    },
    plugins: {
      react: pluginReact,
    },

    rules: {
      "react/react-in-jsx-scope": "error",
      "react/forbid-component-props": "error",
      "react/jsx-no-literals": "error",
      "react/jsx-max-depth": ["error", { max: 7 }],
    },
  },
];

export default eslintConf;
