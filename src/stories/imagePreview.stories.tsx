import type {Meta, StoryObj} from "@storybook/react"
import ImagePreview, {type ImagePreviewProps} from "../components/ImagePreview"
import type React from "react"

type Story = StoryObj<typeof ImagePreview>

const meta: Meta<typeof ImagePreview> = {
  component: ImagePreview,
}
const render = (args: ImagePreviewProps): React.JSX.Element => (
  <ImagePreview {...args} />
)

export const Default: Story = {
  render,
  args: {},
}

export default meta
