module.exports = {
  root: true,

  env: {
    node: true,
  },

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },

  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
  },

  extends: [
    "plugin:vue/vue3-essential",
    "@vue/prettier",
    "@vue/typescript",
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
  ],
};
