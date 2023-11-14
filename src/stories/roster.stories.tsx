import {Meta, StoryObj} from "@storybook/react"
import ChatList from "../components/Roster"

type Story = StoryObj<typeof ChatList>

const meta: Meta<typeof ChatList> = {component: ChatList}
const render = () => <ChatList />

export const DefaultChatList: Story = {
  render,
  args: {}
}

export default meta
