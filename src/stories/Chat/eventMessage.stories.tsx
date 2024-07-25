import EventMessage, {type EventMessageProps} from "@/components/EventMessage"
import {type Meta, type StoryObj} from "@storybook/react"
import React from "react"

type Story = StoryObj<typeof EventMessage>

const meta: Meta<typeof EventMessage> = {component: EventMessage}

const render = (args: EventMessageProps): React.JSX.Element => (
  <EventMessage {...args} />
)

export const Default: Story = {
  render,
  args: {
    text: "",
    timestamp: Date.now(),
  },
}

export const NameChange: Story = {
  render,
  args: {
    text: "Sapphire Pineapple changed their name to Snappy Turtle",
    timestamp: Date.now(),
  },
}

export default meta
