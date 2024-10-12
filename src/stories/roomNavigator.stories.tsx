import {RoomType} from "@/components/Room"
import {
  RoomNavigator,
  type RoomNavigatorProps,
} from "@/containers/NavigationSection/RoomNavigator"
import {type StoryObj, type Meta} from "@storybook/react/*"

type Story = StoryObj<typeof RoomNavigator>

const meta: Meta<typeof RoomNavigator> = {
  component: RoomNavigator,
}

const render = (args: RoomNavigatorProps): React.JSX.Element => (
  <RoomNavigator {...args} />
)

export const Default: Story = {
  render,
  args: {
    isLoading: false,
    isDashboardActive: true,
    className: "max-w-64",
    sections: {
      directs: [
        {
          roomId: "room3",
          roomName: "Dormitorio principal",
          type: RoomType.Direct,
          emoji: "🛏️",
        },
      ],
      groups: [
        {
          roomId: "room1",
          roomName: "Sala de estar",
          type: RoomType.Group,
          emoji: "🛋️",
        },
        {
          roomId: "room2",
          roomName: "Cocina",
          type: RoomType.Group,
          emoji: "🍳",
        },
        {
          roomId: "room4",
          roomName: "Baño",
          type: RoomType.Group,
          emoji: "🚿",
        },
      ],
      recommended: [],
    },
  },
}

export default meta
