import {type Meta, type StoryObj} from "@storybook/react"
import TextMessage, {
  type TextMessageData,
  type TextMessageProps,
} from "@/components/TextMessage"
import React from "react"

type Story = StoryObj<typeof TextMessage>

const meta: Meta<typeof TextMessage> = {component: TextMessage}

const render = (args: TextMessageProps): React.JSX.Element => (
  <TextMessage {...args} />
)

export const DUMMY_MESSAGE_TEXT: TextMessageData = {
  authorDisplayName: "John Doe",
  authorAvatarUrl:
    "https://images.unsplash.com/photo-1706285644467-45769812f872?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  authorDisplayNameColor: "rgb(100, 200, 100)",
  text: "Hello world! \n Que tal? \n \n Todo perfecto",
  timestamp: Date.now(),
  messageId: "text-message-id",
  userId: "user-1",
}

export const Default: Story = {
  render,
  args: {
    ...DUMMY_MESSAGE_TEXT,
    onAuthorClick: () => {},
    contextMenuItems: [],
  },
}

export default meta
