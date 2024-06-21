import {
  ChatMessages,
  type ChatMessagesProps,
} from "@/containers/ChatContainer/ChatMessages"
import {MessageKind, MessagesState} from "@/hooks/matrix/useActiveRoom"
import {type Meta, type StoryObj} from "@storybook/react"

type Story = StoryObj<typeof ChatMessages>

const meta: Meta<typeof ChatMessages> = {
  component: ChatMessages,
  title: "Chat/ChatMessages",
}
const render = (args: ChatMessagesProps) => <ChatMessages {...args} />

export const Loaded: Story = {
  render,
  args: {
    messages: [
      {
        kind: MessageKind.Text,
        data: {
          authorDisplayName: "Emerald branch",
          id: "@emerald_branch",
          text: "Hello world",
          timestamp: Date.now(),
          onDeleteMessage() {},
          onAuthorClick() {},
          authorDisplayNameColor: "",
        },
      },
    ],
    messagesState: MessagesState.Loaded,
  },
}

export const Loading: Story = {
  render,
  args: {
    messages: [],
    messagesState: MessagesState.Loading,
  },
}

export const Error: Story = {
  render,
  args: {
    messages: [],
    messagesState: MessagesState.Error,
  },
}

export const NotMessage: Story = {
  render,
  args: {
    messages: [],
    messagesState: MessagesState.NotMessages,
  },
}

export default meta
