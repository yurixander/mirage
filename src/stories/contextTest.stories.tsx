import {Meta, StoryObj} from "@storybook/react"
import ContextTest from "../components/ContextTest"

type Story = StoryObj<typeof ContextTest>

const meta: Meta<typeof ContextTest> = {component: ContextTest}
const render = () => <ContextTest />

export const Primary: Story = {
  render
}

export default meta
