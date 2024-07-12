import {type Meta, type StoryObj} from "@storybook/react"
import ImageModal from "../containers/ChatContainer/ImageModal"
import React from "react"

type Story = StoryObj<typeof ImageModal>

const meta: Meta<typeof ImageModal> = {
  component: ImageModal,
}
const render = (): React.JSX.Element => <ImageModal onClose={() => {}} />

export const Default: Story = {
  render,
  args: {},
}

export default meta
