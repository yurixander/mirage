import {type Meta, type StoryObj} from "@storybook/react"
import EventMessage, {type EventMessageProps} from "@/components/EventMessage"

type Story = StoryObj<typeof EventMessage>

const meta: Meta<typeof EventMessage> = {
  component: EventMessage,
  title: "Chat/EventMessage",
}

const render = (arguments_: EventMessageProps) => (
  <EventMessage {...arguments_} />
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
