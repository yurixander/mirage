import {type Meta, type StoryObj} from "@storybook/react"
import WelcomChatContainer from "../components/WelcomChatContainer"

type Story = StoryObj<typeof WelcomChatContainer>

const meta: Meta<typeof WelcomChatContainer> = {
  component: WelcomChatContainer,
}

const render = () => <WelcomChatContainer />

export const Default: Story = {
  render,
  args: {},
}

export default meta
