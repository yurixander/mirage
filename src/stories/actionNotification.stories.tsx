import {type Meta, type StoryObj} from "@storybook/react"
import ActionNotification, {
  type ActionNotificationProps,
} from "../components/ActionNotification"
import {NotificationType} from "@/containers/NavigationSection/hooks/useNotification"

type Story = StoryObj<typeof ActionNotification>

const meta: Meta<typeof ActionNotification> = {
  component: ActionNotification,
}
const render = (args: ActionNotificationProps) => (
  <ActionNotification {...args} />
)

export const Default: Story = {
  render,
  args: {
    isRead: true,
    notificationId: 0,
    roomName: "Figma Utils",
    sender: "Emerald branch",
    type: NotificationType.Invited,
    onAction: () => {},
    markAsRead() {},
    onDelete() {},
    notificationTime: Date.now(),
  },
}

export default meta
