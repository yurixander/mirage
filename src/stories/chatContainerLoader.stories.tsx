import {type Meta, type StoryObj} from "@storybook/react"
import ChatContainerLoader from "../containers/ChatContainer/MessagesPlaceholder"
import React from "react"

type Story = StoryObj<typeof ChatContainerLoader>

const meta: Meta<typeof ChatContainerLoader> = {
  component: ChatContainerLoader,
}

const render = (): React.JSX.Element => <ChatContainerLoader />

export const Default: Story = {
  render,
}

export default meta
