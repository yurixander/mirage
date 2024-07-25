import {
  ChatMessages,
  type ChatMessagesProps,
} from "@/containers/RoomContainer/ChatMessages"
import {
  type AnyMessage,
  MessageKind,
  MessagesState,
} from "@/containers/RoomContainer/hooks/useRoomChat"
import {type Meta, type StoryObj} from "@storybook/react"
import React from "react"

type Story = StoryObj<typeof ChatMessages>

const meta: Meta<typeof ChatMessages> = {
  component: ChatMessages,
  title: "Chat/ChatMessages",
}
const render = (args: ChatMessagesProps): React.JSX.Element => (
  <ChatMessages {...args} />
)

const tempMessage: AnyMessage = {
  kind: MessageKind.Text,
  data: {
    authorDisplayName: "Emerald branch",
    id: "@emerald_branch",
    text: "Hello world",
    timestamp: Date.now(),
    onAuthorClick() {},
    authorDisplayNameColor: "",
    contextMenuItems: [],
  },
}

export const Loaded: Story = {
  render,
  args: {
    messages: [
      tempMessage,
      tempMessage,
      tempMessage,
      tempMessage,
      tempMessage,
      tempMessage,
      tempMessage,
      tempMessage,
      tempMessage,
      {
        kind: MessageKind.Event,
        data: {
          id: "",
          text: "Emerald branch change name to Chris",
          timestamp: Date.now(),
        },
      },
      {
        kind: MessageKind.Image,
        data: {
          authorDisplayName: "Emerald Branch",
          authorDisplayNameColor: "",
          id: "",
          text: "",
          timestamp: Date.now(),
          onAuthorClick() {},
          contextMenuItems: [],
          onClickImage() {},
          imageUrl:
            "https://images.unsplash.com/photo-1706285644467-45769812f872?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
