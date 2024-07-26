import {type Meta, type StoryObj} from "@storybook/react"
import AudioMessage, {type AudioMessageProps} from "@/components/AudioMessage"
import React from "react"

type Story = StoryObj<typeof AudioMessage>

const meta: Meta<typeof AudioMessage> = {
  component: AudioMessage,
}

const render = (args: AudioMessageProps): React.JSX.Element => (
  <AudioMessage {...args} />
)

export const Default: Story = {
  render,
  args: {
    authorDisplayName: "John Doe",
    timestamp: Date.now(),
    onAuthorClick: () => {},
  },
}

export default meta
