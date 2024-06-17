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
import {UserPowerLevel} from "@/containers/Roster/RosterUser"

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
  sender: string
  senderMxcAvatarUrl?: string
}

type NotificationPartialData = {
  notificationKind: NotificationKind
  isRead: boolean
  roomName: string
  roomId: string
  notificationTime: number
  notificationId: string
  sender: string
  senderMxcAvatarUrl?: string
}

export function getNotificationFromMembersEvent(
  event: MatrixEvent,
  client: MatrixClient,
  member: RoomMember,
  oldMembership?: string
): LocalNotificationData | null {
  const eventId = event.getId()
  const sender = event.getSender()
  const room = client.getRoom(member.roomId)

  assert(eventId !== undefined, CommonAssertion.EventIdNotFound)
  assert(sender !== undefined, CommonAssertion.EventSenderNotFount)

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
    sender: event.sender?.name ?? sender,
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

export function getNotificationFromPowerLevelEvent(
  client: MatrixClient,
  event: MatrixEvent,
  currentLevels: number,
  userId: string
): LocalNotificationData | null {
  const isAdmin = currentLevels === UserPowerLevel.Admin
  const isMod = currentLevels === UserPowerLevel.Moderator
  const eventId = event.getId()
  const room = client.getRoom(event.getRoomId())
  const sender = event.getSender()
  const prevContent = event.getPrevContent()

  assert(eventId !== undefined, CommonAssertion.EventIdNotFound)
  assert(room !== null, "The room should be exist")
  assert(sender !== undefined, CommonAssertion.EventSenderNotFount)

  // If it does not have users, is a Room in creation, it cannot be processed.
  if (prevContent.users === undefined) {
    return null
  }

  const partialNotification: NotificationPartialData = {
    isRead: false,
    notificationId: eventId,
    notificationKind: NotificationKind.InlineNotification,
    notificationTime: event.localTimestamp,
    roomId: room.roomId,
    roomName: room.name,
    sender: event.sender?.name ?? sender,
    senderMxcAvatarUrl: event.sender?.getMxcAvatarUrl(),
  }

  const previousLevels: number = prevContent.users[userId] ?? 0
  let type: NotificationType | null = null

  if (currentLevels > previousLevels) {
    type = isAdmin
      ? NotificationType.UpgradeToAdmin
      : isMod
        ? NotificationType.UpgradeToModerator
        : null
  } else if (currentLevels < previousLevels) {
    type =
      currentLevels === UserPowerLevel.Member
        ? NotificationType.DowngradeToMember
        : null
  }

  // Check that an event with magic numbers is not processed.
  if (type === null) {
    return null
  }

  return {
    ...partialNotification,
    type,
  }
}
