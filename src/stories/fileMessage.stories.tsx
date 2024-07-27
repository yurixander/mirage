import {type Meta, type StoryObj} from "@storybook/react"
import FileMessage, {
  FileMessageVariant,
  type FileMessageProps,
} from "../components/FileMessage"
import React from "react"

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
    typeFile: "PPT",
    onClick: () => {},
    variant: FileMessageVariant.Default,
  },
}

export const Download: Story = {
  render,
  args: {
    authorDisplayName: "John Doe",
    authorDisplayNameColor: "green",
    fileName: "Document.doc",
    fileSize: 2_500_000,
    typeFile: "DOC",
    onClick: () => {},
    variant: FileMessageVariant.Default,
    isDownloadStarted: true,
    progressDownloaded: 60,
  },
}

export const Upload: Story = {
  render,
  args: {
    authorDisplayName: "John Doe",
    authorDisplayNameColor: "green",
    fileName: "Document.doc",
    fileSize: 2_500_000,
    typeFile: "DOC",
    onClick: () => {},
    variant: FileMessageVariant.Upload,
    progressDownloaded: 40,
  },
}
export default meta
