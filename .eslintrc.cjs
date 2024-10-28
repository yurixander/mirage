module.exports = {
  root: true,
  env: {browser: true, es2020: true},
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:storybook/recommended",
    "plugin:prettier/recommended",
    "love",
    "eslint-config-prettier",
    "plugin:tailwindcss/recommended",
    "plugin:sonarjs/recommended",
    "plugin:github/react",
    "plugin:unicorn/recommended",
    "plugin:deprecation/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:functional/external-typescript-recommended",
    "plugin:import/typescript",
    "plugin:no-use-extend-native/recommended",
    "plugin:promise/recommended",
    "plugin:regexp/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "postcss.config.js"],
  parser: "@typescript-eslint/parser",
  plugins: ["prettier", "write-good-comments", "functional", "promise"],
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/quotes": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/space-before-function-paren": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "operator-linebreak": "off",
    "multiline-ternary": "off",
    "react/no-children-prop": "off",
    "prefer-regex-literals": "off",
    "no-useless-escape": "off",
    "@typescript-eslint/no-non-null-assertion": "warn",
    "@typescript-eslint/no-floating-promises": "warn",
    "no-new": "off",
    "sonarjs/cognitive-complexity": ["error", 17],
    "unicorn/filename-case": ["off"],
    "unicorn/prevent-abbreviations": ["off"],
    "unicorn/no-nested-ternary": "off",
    "unicorn/no-null": ["off"],
    "unicorn/prefer-code-point": "off",
    "write-good-comments/write-good-comments": [
      "warn",
      {
        passive: false,
        whitelist: ["read-only"],
      },
    ],
    "@typescript-eslint/no-throw-literal": "off",
    "promise/always-return": "off",
    "unicorn/number-literal-case": "off",
    "unicorn/prefer-spread": "off",
    "jsx-a11y/media-has-caption": [0],
    "unicorn/prefer-global-this": "off",
  },
  settings: {
    "react": {
      version: "detect",
    },
    "import/extensions": [".ts", ".tsx"],
    "import/resolver": {
      node: {
        extensions: [".ts", ".tsx"],
      },
    },
  },
}
