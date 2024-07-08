import {UserPowerLevel} from "./members"

const POWER_LEVELS_LOCAL_STORAGE_KEY = "local_power_levels_notifications"
const NOTIFICATIONS_LOCAL_STORAGE_KEY = "local_notifications_history"

export enum NotificationType {
  Invited,
  InvitationRemoved,
  UpgradeToAdmin,
  UpgradeToModerator,
  DowngradeToMember,
}

export const notificationsBody: {[key in NotificationType]: string} = {
  [NotificationType.Invited]: "Has invited you to",
  [NotificationType.InvitationRemoved]:
    "The invitation to join has been withdrawn to",
  [NotificationType.DowngradeToMember]: "You have been demoted to member in",
  [NotificationType.UpgradeToAdmin]: "You have been promoted to admin in",
  [NotificationType.UpgradeToModerator]:
    "You have been promoted to moderator in",
}

// #region Set and Get
export type CurrentPowerLevelData = {
  roomId: string
  currentPowerLevel: UserPowerLevel
}

export function getPowerLevelsHistory(): CurrentPowerLevelData[] {
  const cachedPowerLevels = localStorage.getItem(POWER_LEVELS_LOCAL_STORAGE_KEY)

  try {
    return cachedPowerLevels === null ? [] : JSON.parse(cachedPowerLevels)
  } catch {
    return []
  }
}

export function setPowerLevelsHistory(newPowerLevels: CurrentPowerLevelData[]) {
  localStorage.setItem(
    POWER_LEVELS_LOCAL_STORAGE_KEY,
    JSON.stringify(newPowerLevels)
  )
}

export type LocalNotificationData = {
  type: NotificationType
  containsAction: boolean
  isRead: boolean
  roomName: string
  roomId: string
  notificationTime: number
  notificationId: string
  sender: string
  senderAvatarUrl?: string
}

export function getNotificationsHistory(): LocalNotificationData[] {
  const savedNotifications = localStorage.getItem(
    NOTIFICATIONS_LOCAL_STORAGE_KEY
  )

  try {
    return savedNotifications === null ? [] : JSON.parse(savedNotifications)
  } catch {
    return []
  }
}

export function setNotificationsHistory(
  notifications: LocalNotificationData[]
) {
  localStorage.setItem(
    NOTIFICATIONS_LOCAL_STORAGE_KEY,
    JSON.stringify(notifications)
  )
}

// #region Power level
export function notificationTypeTransformer(
  currentPowerLevel: UserPowerLevel | null,
  cachedPowerLevel: UserPowerLevel | null
): NotificationType | null {
  // If they are the same there were no changes.
  if (currentPowerLevel === cachedPowerLevel) {
    return null
  }

  const currentLevels = currentPowerLevel ?? UserPowerLevel.Member
  const previousLevels = cachedPowerLevel ?? UserPowerLevel.Member

  if (currentLevels.valueOf() > previousLevels.valueOf()) {
    return currentLevels === UserPowerLevel.Admin
      ? NotificationType.UpgradeToAdmin
      : currentLevels === UserPowerLevel.Moderator
        ? NotificationType.UpgradeToModerator
        : null
  } else if (currentLevels.valueOf() < previousLevels.valueOf()) {
    return currentLevels === UserPowerLevel.Member
      ? NotificationType.DowngradeToMember
      : null
  }

  return null
}
