import {type Meta, type StoryObj} from "@storybook/react"
import SmartAction, {type SmartActionProps} from "../components/SmartAction"
import {IoMdMedical} from "react-icons/io"
import React from "react"

type Story = StoryObj<typeof SmartAction>

const meta: Meta<typeof SmartAction> = {component: SmartAction}

const render = (args: SmartActionProps): React.JSX.Element => (
  <SmartAction {...args} />
)

export const Default: Story = {
  render,
  args: {
    Icon: IoMdMedical,
    text: "This is a smart action",
    onClick: () => {},
  },
}

export default meta
