import {type NotificationProps} from "@/components/Notification"
import NotificationDot from "@/components/NotificationDot"
import {Button} from "@/components/ui/button"
import NotificationsTray, {
  type NotificationsTrayProps,
} from "@/containers/NavigationSection/NotificationsTray"
import {NotificationType} from "@/utils/notifications"
import {type Meta, type StoryObj} from "@storybook/react"
import React from "react"
import {IoNotifications} from "react-icons/io5"

type Story = StoryObj<typeof NotificationsTray>

const meta: Meta<typeof NotificationsTray> = {
  component: NotificationsTray,
}

const render = (args: NotificationsTrayProps): React.JSX.Element => (
  <NotificationsTray {...args}>
    <Button aria-label="View notifications" size="icon" variant="ghost">
      <NotificationDot isVisible={false}>
        <IoNotifications size={20} />
      </NotificationDot>
    </Button>
  </NotificationsTray>
)

const notifications: NotificationProps[] = [
  {
    isRead: false,
    type: NotificationType.Invited,
    notificationId: "id-2",
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
    notificationId: "id-99",
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
    isLoading: false,
  },
}

export const Loading: Story = {
  render,
  args: {
    notifications,
    isLoading: true,
  },
}

export default meta
