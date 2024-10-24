import {type Meta, type StoryObj} from "@storybook/react"
import VideoPreview, {type VideoPreviewProps} from "../components/VideoPreview"

type Story = StoryObj<typeof VideoPreview>

const meta: Meta<typeof VideoPreview> = {
  component: VideoPreview,
}

const render = (args: VideoPreviewProps): React.JSX.Element => (
  <VideoPreview {...args} />
)

export const Default: Story = {
  render,
  args: {videoSrc: ""},
}

export default meta
