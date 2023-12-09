import {Meta, StoryObj} from "@storybook/react"
import MessageContainer, {MessageContainerProps} from "../components/MessageContainer"

type Story = StoryObj<typeof MessageContainer>

const meta: Meta<typeof MessageContainer> = {component: MessageContainer}
const render = (args: MessageContainerProps) => <MessageContainer {...args} />

export const Default: Story = {
  render,
  args: {
    authorDisplayName: "John Doe",
    // TODO: Demo avatar URL.
    authorAvatarUrl: "https://bestprofilepictures.com/wp-content/uploads/2020/07/Awesome-Profile-Picture-For-Facebook.jpg",
    authorDisplayNameColor: "rgb(100, 200, 100)",
    timestamp: Date.now(),
    onAuthorClick: () => { },
  }
}

export default meta
