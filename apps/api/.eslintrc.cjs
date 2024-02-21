module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js"],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  rules: {
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/require-await": "off",
  },
};
