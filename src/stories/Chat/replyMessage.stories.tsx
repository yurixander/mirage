import ReplyMessage, {type ReplyMessageProps} from "@/components/ReplyMessage"
import type {Meta, StoryObj} from "@storybook/react"
import type React from "react"

type Story = StoryObj<typeof ReplyMessage>

const meta: Meta<typeof ReplyMessage> = {
  component: ReplyMessage,
}
const render = (args: ReplyMessageProps): React.JSX.Element => (
  <ReplyMessage {...args} />
)

export const Default: Story = {
  render,
  args: {
    authorDisplayName: "John Doe",
    authorAvatarUrl:
      "https://images.unsplash.com/photo-1706285644467-45769812f872?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorDisplayNameColor: "rgb(100, 200, 100)",
    text: "Hello, good, and you?",
    timestamp: Date.now(),
    onAuthorClick: () => {},
    contextMenuItems: [],
    messageId: "$TOGC8_JEyugxWfBqWtF5tKbykN8tdAcp5s3E6jjZRGM",
    onQuoteMessageClick: () => {},
    quotedMessageId: "$TOGC8_JEyugxWfBqWtF5tKbykN8tdAcp5s3E6jjZRGM",
    quotedText: "How are you",
    quotedUserDisplayName: "Luis",
    userId: "User",
  },
}

export default meta
