import {type Meta, type StoryObj} from "@storybook/react"
import RoomEncryptedIndicator from "../components/RoomEncryptedIndicator"
import React from "react"

type Story = StoryObj<typeof RoomEncryptedIndicator>

const meta: Meta<typeof RoomEncryptedIndicator> = {
  component: RoomEncryptedIndicator,
}
const render = (): React.JSX.Element => <RoomEncryptedIndicator />

export const Default: Story = {
  render,
  args: {},
}

export default meta
