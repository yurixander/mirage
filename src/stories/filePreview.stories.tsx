import type {Meta, StoryObj} from "@storybook/react"
import FilePreview, {type FilePreviewProps} from "../components/FilePreview"
import type React from "react"

type Story = StoryObj<typeof FilePreview>

const meta: Meta<typeof FilePreview> = {
  component: FilePreview,
}
const render = (args: FilePreviewProps): React.JSX.Element => (
  <FilePreview {...args} />
)

export const Default: Story = {
  render,
  args: {
    fileName: "Document.doc",
    fileSize: 100_000,
  },
}

export default meta
