import {type Meta, type StoryObj} from "@storybook/react"
import WelcomeSplash from "../containers/ChatContainer/WelcomeSplash"
import React from "react"

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
