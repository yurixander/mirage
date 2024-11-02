import type {StorybookConfig} from "@storybook/react-vite"
import path from "node:path"

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  viteFinal: config => {
    if (config.resolve === undefined) {
      return config
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(import.meta.dirname, "../src"),
    }

    return config
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    check: true,
  },
}
export default config
