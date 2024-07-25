import {type NotificationProps} from "@/components/Notification"
import NotificationBoxPopup, {
  type NotificationBoxPopupProps,
} from "@/containers/NavigationSection/modals/NotificationBoxPopup"
import {NotificationType} from "@/utils/notifications"
import {type Meta, type StoryObj} from "@storybook/react"
import React from "react"

type Story = StoryObj<typeof NotificationBoxPopup>

const meta: Meta<typeof NotificationBoxPopup> = {
  component: NotificationBoxPopup,
}
const render = (args: NotificationBoxPopupProps): React.JSX.Element => (
  <NotificationBoxPopup {...args} />
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
    type: NotificationType.DowngradeToMember,
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
  },
}

export default meta
