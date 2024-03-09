import {type Meta, type StoryObj} from "@storybook/react"
import MessageContainer, {
  type MessageContainerProps as MessageContainerProperties,
} from "../components/MessageContainer"

type Story = StoryObj<typeof MessageContainer>

const meta: Meta<typeof MessageContainer> = {component: MessageContainer}
const render = (arguments_: MessageContainerProperties) => <MessageContainer {...arguments_} />

export const Default: Story = {
  render,
  args: {
    authorDisplayName: "John Doe",
    // TODO: Demo avatar URL.
    authorAvatarUrl:
      "https://images.unsplash.com/photo-1706285644467-45769812f872?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorDisplayNameColor: "rgb(100, 200, 100)",
    timestamp: Date.now(),
    onAuthorClick: () => {},
  },
}

export default meta
