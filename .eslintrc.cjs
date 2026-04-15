/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // indent: ["error", 2],
    "vue/attributes-order": [
      "warn",
      {
        alphabetical: true,
      },
    ],
    "prettier/prettier": "error",

    // "vue/max-attributes-per-line": [
    //   "error",
    //   {
    //     singleline: {
    //       max: 1,
    //     },
    //     multiline: {
    //       max: 1,
    //     },
    //   },
    // ],
  },
  plugins: ["prettier"],
};
