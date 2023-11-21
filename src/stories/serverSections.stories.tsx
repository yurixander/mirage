import {Meta, StoryObj} from "@storybook/react"
import ServerSections, {ServerSectionsProps} from "../components/ServerSections"
import {RoomType} from "../components/Room"

type Story = StoryObj<typeof ServerSections>

const meta: Meta<typeof ServerSections> = {component: ServerSections}
const render = (args: ServerSectionsProps) => <ServerSections {...args} />

export const Default: Story = {
  render,
  args: {
    rooms: [
      {
        name: "Welcome",
        type: RoomType.Space,
        isActive: false,
        containsUnreadMessages: false,
        mentionCount: 0,
        onClick: () => { }
      },
      {
        name: "Introductions",
        type: RoomType.Space,
        isActive: false,
        containsUnreadMessages: false,
        mentionCount: 0,
        onClick: () => { }
      },
      {
        name: "Lobby",
        type: RoomType.Text,
        isActive: false,
        containsUnreadMessages: true,
        mentionCount: 2,
        onClick: () => { }
      },
      {
        name: "Invites only",
        type: RoomType.Text,
        isActive: false,
        containsUnreadMessages: true,
        mentionCount: 0,
        onClick: () => { }
      },
      {
        name: "Help & guides",
        type: RoomType.Text,
        isActive: true,
        containsUnreadMessages: false,
        mentionCount: 0,
        onClick: () => { }
      },
      {
        name: "Games",
        type: RoomType.Text,
        isActive: false,
        containsUnreadMessages: true,
        mentionCount: 0,
        onClick: () => { }
      },
      {
        name: "Off-topic",
        type: RoomType.Text,
        isActive: false,
        containsUnreadMessages: false,
        mentionCount: 0,
        onClick: () => { }
      },
      {
        name: "Admin room",
        type: RoomType.Text,
        isActive: false,
        containsUnreadMessages: false,
        mentionCount: 0,
        onClick: () => { }
      }
    ]
  }
}

export default meta
