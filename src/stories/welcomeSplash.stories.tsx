import {type Meta, type StoryObj} from "@storybook/react"
import WelcomeSplash from "../containers/ChatContainer/WelcomeSplash"

type Story = StoryObj<typeof WelcomeSplash>

const meta: Meta<typeof WelcomeSplash> = {
  component: WelcomeSplash,
}

const render = () => <WelcomeSplash />

export const Default: Story = {
  render,
  args: {},
}

export default meta
