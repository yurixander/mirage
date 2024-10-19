import type {Meta, StoryObj} from "@storybook/react"
import type React from "react"
import FileMessage, {type FileMessageProps} from "../../components/FileMessage"

type Story = StoryObj<typeof FileMessage>

const meta: Meta<typeof FileMessage> = {
  component: FileMessage,
}
const render = (args: FileMessageProps): React.JSX.Element => (
  <FileMessage {...args} />
)

export const Default: Story = {
  render,
  args: {
    authorDisplayName: "John Doe",
    authorDisplayNameColor: "green",
    fileName: "Presentation.ppt",
    fileSize: 2_500_000,
    userId: "@userId",
  },
}

export default meta
