import {NotificationType} from "@/utils/notifications"
import type {Meta, StoryObj} from "@storybook/react"
import type React from "react"
import Notification, {type NotificationProps} from "../components/Notification"

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
    markAsRead(_notificationId) {},
    onDelete(_notificationId) {},
    action() {},
  },
}

export default meta
