import {type Meta, type StoryObj} from "@storybook/react"
import ChatContainerLoader from "../../containers/RoomContainer/MessagesPlaceholder"
import React from "react"

type Story = StoryObj<typeof ChatContainerLoader>

const meta: Meta<typeof ChatContainerLoader> = {
  component: ChatContainerLoader,
  title: "Chat/ChatContainerLoader",
}

const render = (): React.JSX.Element => <ChatContainerLoader />

export const Default: Story = {
  render,
}

export default meta
