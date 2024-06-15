import {
  NotificationType,
  type AnyNotification,
} from "@/containers/NavigationSection/hooks/useNotification"
import {
  type MatrixClient,
  type MatrixEvent,
  type RoomMember,
} from "matrix-js-sdk"
import {assert, CommonAssertion} from "./util"
import {KnownMembership} from "matrix-js-sdk/lib/@types/membership"

const NOTIFICATIONS_LOCAL_STORAGE_KEY = "local_notifications"

export function getNotificationsData(): AnyNotification[] {
  const savedNotifications = localStorage.getItem(
    NOTIFICATIONS_LOCAL_STORAGE_KEY
  )

  return savedNotifications ? JSON.parse(savedNotifications) : []
}

export function setNotificationsData(notifications: AnyNotification[]) {
  localStorage.setItem(
    NOTIFICATIONS_LOCAL_STORAGE_KEY,
    JSON.stringify(notifications)
  )
}

export type LocalNotificationData = {
  type: NotificationType
  isRead: boolean
  roomName: string
  notificationTime: number
  notificationId: string
  sender?: string
  senderMxcAvatarUrl?: string
}

type NotificationPartialData = {
  isRead: boolean
  roomName: string
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

  console.log(event, member, oldMembership)

  assert(eventId !== undefined, CommonAssertion.EventIdNotFound)

  // A null room in this case is a room that is being created and the notification should not be processed.
  if (room === null) {
    return null
  }

  const partialNotification: NotificationPartialData = {
    isRead: false,
    notificationId: eventId,
    notificationTime: event.localTimestamp,
    roomName: room.name,
    sender: event.sender?.name,
    senderMxcAvatarUrl: event.sender?.getMxcAvatarUrl(),
  }

  switch (member.membership) {
    case KnownMembership.Invite: {
      // getNotificationFromInviteEvent(
      //   room.roomId,
      //   room.name,
      //   getImageUrl(room.getMxcAvatarUrl(), client)
      // )

      break
    }
    case KnownMembership.Leave: {
      const isCurrentUser = sender === member.userId

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
      // return {
      //   body: `you have been banned from the ${room.name} ${reason}`,
      //   isRead: false,
      //   notificationId: eventId,
      //   notificationTime: event.localTimestamp,
      //   senderName: event.sender?.name,
      //   avatarSenderUrl: getImageUrl(event.sender?.getMxcAvatarUrl(), client),
      // }

      break
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
    // return {
    //   body: `your ban has been lifted in the ${room.name}`,
    //   isRead: false,
    //   notificationId: eventId,
    //   notificationTime: event.localTimestamp,
    //   senderName: event.sender?.name,
    //   avatarSenderUrl: getImageUrl(event.sender?.getMxcAvatarUrl(), client),
    // }
  }

  return null
}
