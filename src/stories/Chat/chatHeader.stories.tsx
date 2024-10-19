import ChatHeader, {
  type ChatHeaderProps,
} from "@/containers/RoomContainer/ChatHeader"
import type {Meta, StoryObj} from "@storybook/react"
import type React from "react"

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
    roomName: "Help & guides",
    roomDescription: "Request assistance from your colleagues",
    className: "flex",
  },
}

export default meta
