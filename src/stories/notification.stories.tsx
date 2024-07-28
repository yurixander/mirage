import {type Meta, type StoryObj} from "@storybook/react"
import Notification, {type NotificationProps} from "../components/Notification"
import {NotificationType} from "@/utils/notifications"
import React from "react"

type Story = StoryObj<typeof Notification>

const meta: Meta<typeof Notification> = {
  component: Notification,
}
const render = (args: NotificationProps): React.JSX.Element => (
  <Notification {...args} />
)

export const Default: Story = {
  render,
  args: {
    isRead: true,
    type: NotificationType.Invited,
    sender: "Emerald Branch",
    roomName: "Figma Utils",
    roomId: "roomId",
    notificationTime: Date.now(),
    notificationId: "notificationId",
    markAsRead(notificationId) {},
    onDelete(notificationId) {},
    action() {},
  },
}

export default meta
