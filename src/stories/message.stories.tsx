import {Meta, StoryObj} from "@storybook/react"
import Message, {MessageProps} from "../components/Message"

type Story = StoryObj<typeof Message>

const meta: Meta<typeof Message> = {component: Message}
const render = (args: MessageProps) => <Message {...args} />

export const Default: Story = {
  render,
  args: {
    authorDisplayName: "John Doe",
    // TODO: Demo avatar URL.
    authorAvatarUrl: "https://bestprofilepictures.com/wp-content/uploads/2020/07/Awesome-Profile-Picture-For-Facebook.jpg",
    authorDisplayNameColor: "rgb(100, 200, 100)",
    text: "Hello world!",
    timestamp: Date.now(),
    onAuthorClick: () => { },
  }
}

export default meta
