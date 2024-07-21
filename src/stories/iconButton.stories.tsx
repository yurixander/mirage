import {type Meta, type StoryObj} from "@storybook/react"
import IconButton, {type IconButtonProps} from "../components/IconButton"
import {IoPaperPlane, IoNotificationsSharp} from "react-icons/io5"
import React from "react"

type Story = StoryObj<typeof IconButton>

const meta: Meta<typeof IconButton> = {component: IconButton}

const render = (args: IconButtonProps): React.JSX.Element => (
  <IconButton {...args} />
)

export const Settings: Story = {
  render,
  args: {
    Icon: IoPaperPlane,
    onClick: () => {},
    tooltip: "Settings",
  },
}

export const Disabled: Story = {
  render,
  args: {
    Icon: IoPaperPlane,
    onClick: () => {},
    tooltip: "Settings",
    isDisabled: true,
  },
}

export const WithDot: Story = {
  render,
  args: {
    Icon: IoNotificationsSharp,
    onClick: () => {},
    tooltip: "Settings",
    isDotVisible: true,
  },
}

export default meta
