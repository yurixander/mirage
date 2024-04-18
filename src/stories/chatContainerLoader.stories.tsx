import {type Meta, type StoryObj} from "@storybook/react"
import ChatContainerLoader from "../containers/ChatContainer/MessagesPlaceholder"

type Story = StoryObj<typeof ChatContainerLoader>

const meta: Meta<typeof ChatContainerLoader> = {
  component: ChatContainerLoader,
}

const render = () => <ChatContainerLoader />

export const Default: Story = {
  render,
}

export default meta
