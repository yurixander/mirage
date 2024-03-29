import {type Meta, type StoryObj} from "@storybook/react"
import TextMessage, {type TextMessageProps as TextMessageProperties} from "../components/TextMessage"

type Story = StoryObj<typeof TextMessage>

const meta: Meta<typeof TextMessage> = {component: TextMessage}
const render = (arguments_: TextMessageProperties) => (
  <TextMessage {...arguments_} onDeleteMessage={() => {}} />
)

export const Default: Story = {
  render,
  args: {
    authorDisplayName: "John Doe",
    authorAvatarUrl:
      "https://images.unsplash.com/photo-1706285644467-45769812f872?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorDisplayNameColor: "rgb(100, 200, 100)",
    text: "Hello world!",
    timestamp: Date.now(),
    onAuthorClick: () => {},
    onDeleteMessage() {},
  },
}

export default meta
