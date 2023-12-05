import {Meta, StoryObj} from "@storybook/react"
import MessageText, {MessageTextProps} from "../components/MessageText"

type Story = StoryObj<typeof MessageText>

const meta: Meta<typeof MessageText> = {component: MessageText}
const render = (args: MessageTextProps) => <MessageText {...args} />

export const Default: Story = {
  render,
  args: {
    authorDisplayName: "John Doe",
    authorAvatarUrl: "https://bestprofilepictures.com/wp-content/uploads/2020/07/Awesome-Profile-Picture-For-Facebook.jpg",
    authorDisplayNameColor: "rgb(100, 200, 100)",
    text: "Hello world!",
    timestamp: Date.now(),
    onAuthorClick: () => { },
  }
}

export default meta
