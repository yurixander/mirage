import type {Meta, StoryObj} from "@storybook/react"
import type React from "react"
import MessageContainer, {
  type MessageContainerProps,
} from "../components/MessageContainer"

type Story = StoryObj<typeof MessageContainer>

const meta: Meta<typeof MessageContainer> = {component: MessageContainer}

const render = (args: MessageContainerProps): React.JSX.Element => (
  <MessageContainer {...args} />
)

export const Default: Story = {
  render,
  args: {
    authorDisplayName: "John Doe",
    authorAvatarUrl:
      "https://images.unsplash.com/photo-1706285644467-45769812f872?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorDisplayNameColor: "rgb(100, 200, 100)",
    timestamp: Date.now(),
    onAuthorClick: () => {},
    userId: "user-id",
  },
}

export default meta
