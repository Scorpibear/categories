import globals from "globals";
import pluginJs from "@eslint/js";
import pluginJest from "eslint-plugin-jest";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    plugins: { jest: pluginJest },
    languageOptions: { globals: {...globals.browser, ...pluginJest.environments.globals.globals} },
  },
  pluginJs.configs.recommended,
];
