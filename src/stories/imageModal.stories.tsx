import ImageModal from "@/containers/RoomContainer/ImageModal"
import {type Meta, type StoryObj} from "@storybook/react"
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
