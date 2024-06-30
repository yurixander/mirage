import {type NotificationProps} from "@/components/Notification"
import NotificationsModal, {
  type NotificationModalProps,
} from "@/containers/NavigationSection/modals/NotificationsModal"
import {NotificationType} from "@/utils/notifications"
import {type Meta, type StoryObj} from "@storybook/react"

type Story = StoryObj<typeof NotificationsModal>

const meta: Meta<typeof NotificationsModal> = {
  component: NotificationsModal,
}
const render = (args: NotificationModalProps) => (
  <NotificationsModal {...args} />
)

const notifications: NotificationProps[] = [
  {
    isRead: false,
    type: NotificationType.Invited,
    notificationId: "",
    roomName: "Design Utils",
    sender: "Emerald Branch",
    markAsRead() {},
    action() {},
    onDelete() {},
    notificationTime: Date.now(),
    roomId: "",
  },
  {
    isRead: true,
    type: NotificationType.Banned,
    notificationId: "",
    roomName: "Design Utils",
    sender: "Emerald Branch",
    markAsRead() {},
    onDelete() {},
    notificationTime: Date.now(),
    roomId: "",
  },
]

export const Default: Story = {
  render,
  args: {
    notifications,
    onClose: () => {},
    markAllNotificationsAsRead() {},
  },
}

export default meta
