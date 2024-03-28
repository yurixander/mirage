import {type Meta, type StoryObj} from "@storybook/react"
import ImageMessage, {
  type ImageMessageProps as ImageMessageProperties,
} from "../components/ImageMessage"

type Story = StoryObj<typeof ImageMessage>

const meta: Meta<typeof ImageMessage> = {component: ImageMessage}
const render = (arguments_: ImageMessageProperties) => (
  <ImageMessage {...arguments_} />
)

export const Default: Story = {
  render,
  args: {
    imageUrl:
      "https://images.unsplash.com/photo-1706285644467-45769812f872?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorDisplayName: "John Doe",
    authorDisplayNameColor: "rgb(100, 200, 100)",
    authorAvatarUrl:
      "https://images.unsplash.com/photo-1706285644467-45769812f872?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "My new profile picture is awesome, look better the photo details",
    timestamp: Date.now(),
    onAuthorClick: () => {},
    onDeleteMessage: () => {},
  },
}

export default meta
