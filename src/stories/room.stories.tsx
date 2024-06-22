import {type Meta, type StoryObj} from "@storybook/react"
import Room, {type RoomProps} from "../components/Room"

type Story = StoryObj<typeof Room>

const meta: Meta<typeof Room> = {
  component: Room,
}
const render = (args: RoomProps) => <Room {...args} />

export const Default: Story = {
  render,
  args: {
    isSelected: false,
    roomName: "Figma Utils",
    tagEmoji: "🔍",
    onRoomClick() {},
  },
}
export const Selected: Story = {
  render,
  args: {
    isSelected: true,
    roomName: "Figma Utils",
    tagEmoji: "🔍",
    onRoomClick() {},
  },
}

export default meta
