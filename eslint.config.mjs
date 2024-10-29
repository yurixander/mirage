import {fixupConfigRules, fixupPluginRules} from "@eslint/compat"
import prettier from "eslint-plugin-prettier"
import writeGoodComments from "eslint-plugin-write-good-comments"
import functional from "eslint-plugin-functional"
import promise from "eslint-plugin-promise"
import globals from "globals"
import tsParser from "@typescript-eslint/parser"
import path from "node:path"
import {fileURLToPath} from "node:url"
import js from "@eslint/js"
import {FlatCompat} from "@eslint/eslintrc"
import sonarjs from "eslint-plugin-sonarjs"
import noUseExtendNative from "eslint-plugin-no-use-extend-native"
import love from "eslint-config-love"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: [
      "**/dist",
      "**/.eslintrc.cjs",
      "**/postcss.config.js",
      "**/.github",
      "**/.storybook",
      "**/github",
      "**/vite.config.ts",
      "!**/.storybook¡",
      "**/commitlint.config.ts",
      "**/tailwind.config.ts",
      "**/node_modules",
      "**/index.html",
      "**/postcss.config.js",
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react-hooks/recommended",
      "plugin:storybook/recommended",
      "plugin:prettier/recommended",
      "eslint-config-prettier",
      "plugin:tailwindcss/recommended",
      "plugin:github/react",
      "plugin:unicorn/recommended",
      "plugin:deprecation/recommended",
      "plugin:jsx-a11y/recommended",
      "plugin:import/typescript",
      "plugin:regexp/recommended"
    )
  ),
  {
    plugins: {
      "prettier": fixupPluginRules(prettier),
      "write-good-comments": fixupPluginRules(writeGoodComments),
      "functional": fixupPluginRules(functional),
      "promise": fixupPluginRules(promise),
      "sonarjs": fixupPluginRules(sonarjs),
      "noUseExtendNative": fixupPluginRules(noUseExtendNative),
      "love": fixupConfigRules(love),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
      },
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
  },
]
