import {Meta, StoryObj} from "@storybook/react"
import ImageMessage, {ImageMessageProps} from "../components/ImageMessage"

type Story = StoryObj<typeof ImageMessage>

const meta: Meta<typeof ImageMessage> = {component: ImageMessage}
const render = (args: ImageMessageProps) => <ImageMessage {...args} />

export const Default: Story = {
  render,
  args: {
    imageUrl: "https://bestprofilepictures.com/wp-content/uploads/2020/07/Awesome-Profile-Picture-For-Facebook.jpg",
    authorDisplayName: "John Doe",
    authorDisplayNameColor: "rgb(100, 200, 100)",
    authorAvatarUrl: "https://bestprofilepictures.com/wp-content/uploads/2020/07/Awesome-Profile-Picture-For-Facebook.jpg",
    text: "My new profile picture is awesome, look better the photo details",
    timestamp: Date.now(),
    onAuthorClick: () => { }
  }
}

export default meta
