import {type Meta, type StoryObj} from "@storybook/react"
import ChatHeader, {
  type ChatHeaderProps,
} from "@/containers/RoomContainer/ChatHeader"
import React from "react"

type Story = StoryObj<typeof ChatHeader>

const meta: Meta<typeof ChatHeader> = {
  component: ChatHeader,
}
const render = (args: ChatHeaderProps): React.JSX.Element => (
  <ChatHeader {...args} />
)

export const Default: Story = {
  render,
  args: {
    roomDetail: {
      roomName: "Help & guides",
      roomDescription:
        "Request assistance from your colleagues Help & guidesHelp & guidesHelp & guidesHelp & guidesHelp & guidesHelp & guidesHelp & guidesHelp & guidesHelp & guides",
      isRoomEncrypted: true,
    },
    className: "flex",
  },
}

export default meta
