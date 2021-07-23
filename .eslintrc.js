module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {},
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "no-unused-expressions": "off",
        quotes: ["warn", "double"],
        "max-classes-per-file": ["error", 42],
        "linebreak-style": ["warn", "unix"],
        "import/extensions": ["warn", "always"],
        "import/prefer-default-export": "off",
        "class-methods-use-this": ["error", { exceptMethods: ["create"] }],
        curly: ["error", "multi-line"],
        "no-debugger": "warn",
        "no-unexpected-multiline": "warn",

      },
    },
  ],
};
