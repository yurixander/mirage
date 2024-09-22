import EventMessage, {type EventMessageProps} from "@/components/EventMessage"
import {type Meta, type StoryObj} from "@storybook/react"
import React from "react"

type Story = StoryObj<typeof EventMessage>

const meta: Meta<typeof EventMessage> = {component: EventMessage}

const render = (args: EventMessageProps): React.JSX.Element => (
  <EventMessage {...args} />
)

export const NameChange: Story = {
  render,
  args: {
    body: "Sapphire Pineapple changed their name to Snappy Turtle",
    sender: {
      displayName: "Sapphire Pineapple",
      userId: "@sapphire_pineapple",
    },
    eventId: "id-1",
    timestamp: Date.now(),
  },
}

export default meta
