import {type Meta, type StoryObj} from "@storybook/react"
import WelcomChatContainer from "../../containers/ChatContainer/WelcomeSplash"

type Story = StoryObj<typeof WelcomChatContainer>

const meta: Meta<typeof WelcomChatContainer> = {
  component: WelcomChatContainer,
  title: "Chat/WelcomeSplash",
}

const render = () => <WelcomChatContainer />

export const Default: Story = {
  render,
  args: {},
}

export default meta
