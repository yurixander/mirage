import WelcomeSplash from "@/containers/RoomContainer/WelcomeSplash"
import {type Meta, type StoryObj} from "@storybook/react"
import React from "react"

type Story = StoryObj<typeof WelcomeSplash>

const meta: Meta<typeof WelcomeSplash> = {
  component: WelcomeSplash,
  title: "Chat/WelcomeSplash",
}

const render = (): React.JSX.Element => <WelcomeSplash />

export const Default: Story = {
  render,
  args: {},
}

export default meta
