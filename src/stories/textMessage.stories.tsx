import {type Meta, type StoryObj} from "@storybook/react"
import TextMessage, {type TextMessageProps} from "../components/TextMessage"

type Story = StoryObj<typeof TextMessage>

const meta: Meta<typeof TextMessage> = {component: TextMessage}
const render = (args: TextMessageProps) => <TextMessage {...args} />

export const Default: Story = {
  render,
  args: {
    authorDisplayName: "John Doe",
    authorAvatarUrl:
      "https://bestprofilepictures.com/wp-content/uploads/2020/07/Awesome-Profile-Picture-For-Facebook.jpg",
    authorDisplayNameColor: "rgb(100, 200, 100)",
    text: "Hello world!",
    timestamp: Date.now(),
    onAuthorClick: () => {},
  },
}

export default meta
