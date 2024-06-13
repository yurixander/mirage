import {
  type AnyNotification,
  NotificationKind,
  NotificationType,
} from "@/containers/NavigationSection/hooks/useNotification"
import NotificationsModal, {
  type NotificationModalProps,
} from "@/containers/NavigationSection/modals/NotificationsModal"
import {type Meta, type StoryObj} from "@storybook/react"

type Story = StoryObj<typeof NotificationsModal>

const meta: Meta<typeof NotificationsModal> = {
  component: NotificationsModal,
}
const render = (args: NotificationModalProps) => (
  <NotificationsModal {...args} />
)

const notifications: AnyNotification[] = [
  {
    data: {
      isRead: false,
      type: NotificationType.Invited,
      notificationId: 0,
      roomName: "Design Utils",
      sender: "Emerald Branch",
      markAsRead() {},
      onAction() {},
      onDelete() {},
      notificationTime: Date.now(),
    },
    kind: NotificationKind.ActionNotification,
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
