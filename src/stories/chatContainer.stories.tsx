import {Meta, StoryObj} from "@storybook/react"
import ChatContainer from "../components/ChatContainer"

type Story = StoryObj<typeof ChatContainer>

const meta: Meta<typeof ChatContainer> = {component: ChatContainer}
const render = () => <ChatContainer />

export const Default: Story = {
  render
}

export default meta
