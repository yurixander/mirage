import {type Meta, type StoryObj} from "@storybook/react"
import TextMessage from "@/components/TextMessage"
import {type MessageBaseProps} from "@/components/MessageContainer"

type Story = StoryObj<typeof TextMessage>

const meta: Meta<typeof TextMessage> = {component: TextMessage}
const render = (args: MessageBaseProps) => <TextMessage {...args} />

export const Default: Story = {
  render,
  args: {
    authorDisplayName: "John Doe",
    authorAvatarUrl:
      "https://images.unsplash.com/photo-1706285644467-45769812f872?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorDisplayNameColor: "rgb(100, 200, 100)",
    text: "Hello world! \n Que tal? \n \n Todo perfecto",
    timestamp: Date.now(),
    onAuthorClick: () => {},
    contextMenuItems: [],
    id: "text-message-id",
  },
}

export default meta
