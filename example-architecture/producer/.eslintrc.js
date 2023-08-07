module.exports = {
  parserOptions: {
    project: ["../../tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ["cdk.out/**", "coverage/**", "html/**"],
};
