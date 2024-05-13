import SpaceList, {
  type SpaceListProps,
} from "@/containers/NavigationSection/SpaceList"
import {type Meta, type StoryObj} from "@storybook/react"

type Story = StoryObj<typeof SpaceList>

const meta: Meta<typeof SpaceList> = {
  component: SpaceList,
}

const render = (args: SpaceListProps) => <SpaceList {...args} />

export const Default: Story = {
  render,
  args: {
    onRoomSelected: (roomId: string) => {},
    spaces: [
      {
        name: "Design Boards",
        spaceId: "!hello_system#matrix.org",
        childRooms: [
          {
            roomId: "!hello_world#matrix.org",
            roomName: "Cycle Design Team",
            isSelected: false,
          },
          {
            roomId: "!hello_plane#matrix.org",
            roomName: "Cycle 3.0",
            isSelected: false,
          },
          {
            roomId: "!hello_matrix#matrix.org",
            roomName: "Design System",
            isSelected: false,
          },
          {
            roomId: "!hello_universe#matrix.org",
            roomName: "User feedbacks",
            isSelected: false,
          },
        ],
      },
      {
        name: "Figma Tools",
        spaceId: "!hello_system#matrix.org",
        childRooms: [
          {
            roomId: "!hello_matrix#matrix.org",
            roomName: "Design System",
            isSelected: false,
          },
          {
            roomId: "!hello_universe#matrix.org",
            roomName: "User feedbacks",
            isSelected: true,
          },
        ],
      },
    ],
  },
}

export default meta
