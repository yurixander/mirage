import type {Meta, StoryObj} from "@storybook/react"
import VideoMessage, {
  type VideoMessageProps,
} from "../../components/VideoMessage"

type Story = StoryObj<typeof VideoMessage>

const meta: Meta<typeof VideoMessage> = {
  component: VideoMessage,
}
const render = (args: VideoMessageProps): React.JSX.Element => (
  <VideoMessage {...args} />
)

export const Default: Story = {
  render,
  args: {
    authorDisplayName: "Lazaro",
    userId: "@userId",
  },
}

export default meta
