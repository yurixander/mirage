import type {Meta, StoryObj} from "@storybook/react"
import type React from "react"
import Room, {type RoomProps} from "../components/Room"

type Story = StoryObj<typeof Room>

const meta: Meta<typeof Room> = {
  component: Room,
}

const render = (args: RoomProps): React.JSX.Element => <Room {...args} />

export const Default: Story = {
  render,
  args: {
    isSelected: false,
    roomName: "Figma Utils",
    emoji: "🔍",
    onRoomClick() {},
    roomId: "room-id",
  },
}

export const Selected: Story = {
  render,
  args: {
    isSelected: true,
    roomName: "Figma Utils",
    emoji: "🔍",
    onRoomClick() {},
    roomId: "room-id-1",
  },
}

export default meta
