import type {Meta, StoryObj} from "@storybook/react"
import AudioFilePreview, {
  type AudioFilePreviewProps,
} from "../components/AudioFilePreview"
import type React from "react"

type Story = StoryObj<typeof AudioFilePreview>

const meta: Meta<typeof AudioFilePreview> = {
  component: AudioFilePreview,
}
const render = (args: AudioFilePreviewProps): React.JSX.Element => (
  <AudioFilePreview {...args} />
)

export const Default: Story = {
  render,
  args: {
    fileName: "Music.mp3",
    fileSize: 1_000_000,
    audioUrl: "http://webaudioapi.com/samples/audio-tag/chrono.mp3",
  },
}

export default meta
