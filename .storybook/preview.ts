import type {Preview} from "@storybook/react"
import "@/styles/tailwind.css"
import "@/styles/storybook.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
