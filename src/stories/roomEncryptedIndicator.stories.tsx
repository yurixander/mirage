import type {Meta, StoryObj} from "@storybook/react"
import RoomEncryptedIndicator from "../components/RoomEncryptedIndicator"
import type React from "react"

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
