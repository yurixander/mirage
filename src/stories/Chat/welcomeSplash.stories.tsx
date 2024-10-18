import WelcomeSplash from "@/containers/RoomContainer/WelcomeSplash"
import type {Meta, StoryObj} from "@storybook/react"
import type React from "react"

type Story = StoryObj<typeof WelcomeSplash>

const meta: Meta<typeof WelcomeSplash> = {
  component: WelcomeSplash,
}

const render = (): React.JSX.Element => <WelcomeSplash />

export const Default: Story = {
  render,
  args: {},
}

export default meta
