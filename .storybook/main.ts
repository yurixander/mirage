import type {StorybookConfig} from "@storybook/react-webpack5"
import * as path from "node:path"

export default {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-styling-webpack"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
  webpackFinal: async (config) => {
    if (!config.resolve) {
      config.resolve = {};
    }

    if (!config.resolve.alias) {
      config.resolve.alias = {};
    }

    config.resolve.alias["@"] = path.resolve(__dirname, '../src');

    config.module?.rules?.push({
      test: /\.css$/,
      use: ["postcss-loader"],
      include: path.resolve(__dirname, '../'),
      exclude: /node_modules/
    });

    config.module?.rules?.push({
      test: /\.ts?$/,
      use: "ts-loader",
      exclude: /node_modules\/(?!matrix-js-sdk)/,
    });

    return config;
  },
} satisfies StorybookConfig
