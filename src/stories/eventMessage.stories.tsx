import {Meta, StoryObj} from "@storybook/react"
import EventMessage, {EventMessageProps} from "../components/EventMessage"

type Story = StoryObj<typeof EventMessage>

const meta: Meta<typeof EventMessage> = {component: EventMessage}
const render = (args: EventMessageProps) => <EventMessage {...args} />

export const Default: Story = {
  render,
  args: {
    content: <span>This is an event message.</span>,
    timestamp: Date.now()
  }
}

const userDisplayNameColor = "#5CC679"

export const NameChange: Story = {
  render,
  args: {
    content: (
      <span>
        <strong style={{color: userDisplayNameColor}}>Sapphire Pineapple</strong> changed their name to <strong style={{color: userDisplayNameColor}}>Snappy Turtle</strong>.
      </span>
    ),
    timestamp: Date.now()
  }
}

export default meta
