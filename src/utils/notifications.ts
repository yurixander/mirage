import {
  NotificationKind,
  NotificationType,
} from "@/containers/NavigationSection/hooks/useCachedNotifications"
import {
  type MatrixClient,
  type MatrixEvent,
  type RoomMember,
} from "matrix-js-sdk"
import {assert, CommonAssertion} from "./util"
import {KnownMembership} from "matrix-js-sdk/lib/@types/membership"

const NOTIFICATIONS_LOCAL_STORAGE_KEY = "local_notifications"

export function getLocalNotificationsData(): LocalNotificationData[] {
  const savedNotifications = localStorage.getItem(
    NOTIFICATIONS_LOCAL_STORAGE_KEY
  )

  return savedNotifications ? JSON.parse(savedNotifications) : []
}

export function setLocalNotificationsData(
  notifications: LocalNotificationData[]
) {
  localStorage.setItem(
    NOTIFICATIONS_LOCAL_STORAGE_KEY,
    JSON.stringify(notifications)
  )
}

export type LocalNotificationData = {
  type: NotificationType
  notificationKind: NotificationKind
  isRead: boolean
  roomName: string
  roomId: string
  notificationTime: number
  notificationId: string
  sender?: string
  senderMxcAvatarUrl?: string
}

type NotificationPartialData = {
  notificationKind: NotificationKind
  isRead: boolean
  roomName: string
  roomId: string
  notificationTime: number
  notificationId: string
  sender?: string
  senderMxcAvatarUrl?: string
}

export const getNotificationFromMembersEvent = (
  event: MatrixEvent,
  client: MatrixClient,
  member: RoomMember,
  oldMembership?: string
): LocalNotificationData | null => {
  const eventId = event.getId()
  const sender = event.getSender()
  const room = client.getRoom(member.roomId)

  assert(eventId !== undefined, CommonAssertion.EventIdNotFound)

  // A null room in this case is a room that is being created and the notification should not be processed.
  if (room === null) {
    return null
  }

  const partialNotification: NotificationPartialData = {
    isRead: false,
    notificationKind: NotificationKind.InlineNotification,
    notificationId: eventId,
    notificationTime: event.localTimestamp,
    roomName: room.name,
    roomId: member.roomId,
    sender: event.sender?.name,
    senderMxcAvatarUrl: event.sender?.getMxcAvatarUrl(),
  }

  switch (member.membership) {
    case KnownMembership.Invite: {
      return {
        ...partialNotification,
        notificationKind: NotificationKind.ActionNotification,
        type: NotificationType.Invited,
      }
    }
    case KnownMembership.Leave: {
      const isCurrentUser = sender === member.userId

      if (!isCurrentUser && oldMembership === KnownMembership.Ban) {
        return {
          ...partialNotification,
          type: NotificationType.BanRemoved,
        }
      }

      const type =
        isCurrentUser && oldMembership === KnownMembership.Invite
          ? NotificationType.RejectInvitation
          : !isCurrentUser && oldMembership === KnownMembership.Join
            ? NotificationType.Leaved
            : null

      if (type === null) {
        return null
      }

      return {
        ...partialNotification,
        type,
      }
    }
    case KnownMembership.Ban: {
      return {
        ...partialNotification,
        type: NotificationType.Banned,
      }
    }
    case undefined: {
      break
    }
  }

  // The user ban was removed.
  if (
    member.membership !== KnownMembership.Ban &&
    oldMembership === KnownMembership.Ban
  ) {
    return {
      ...partialNotification,
      type: NotificationType.BanRemoved,
    }
  }

  return null
}
