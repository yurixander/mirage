import {Meta, StoryObj} from "@storybook/react"
import ChatContainer, {ChatContainerProps} from "../components/ChatContainer"
import {RoomType} from "../components/Room"

type Story = StoryObj<typeof ChatContainer>

const meta: Meta<typeof ChatContainer> = {component: ChatContainer}
const render = (args: ChatContainerProps) => <ChatContainer {...args} />

export const Default: Story = {
  render,
  args: {
    name: "Help & guides",
    text: "— Request assistance from your colleagues.",
    type: RoomType.Text
  }
}

export default meta
