import {type Meta, type StoryObj} from "@storybook/react"
import Room, {
  type RoomProps as RoomProperties,
  RoomType,
} from "../components/Room"

type Story = StoryObj<typeof Room>

const meta: Meta<typeof Room> = {component: Room}
const render = (arguments_: RoomProperties) => <Room {...arguments_} />

export const ActiveWithMentions: Story = {
  render,
  args: {
    name: "Space room",
    type: RoomType.Space,
    isActive: true,
    containsUnreadMessages: true,
    mentionCount: 99,
  },
}

export const ContainsUnreadMessages: Story = {
  render,
  args: {
    name: "Text room",
    type: RoomType.Space,
    isActive: true,
    containsUnreadMessages: true,
    mentionCount: 0,
  },
}

export const ZeroNotifications: Story = {
  render,
  args: {
    name: "Text room",
    type: RoomType.Direct,
    isActive: false,
    containsUnreadMessages: false,
    mentionCount: 0,
  },
}

export default meta
