import {type PowerLevelNotificationData} from "@/containers/NavigationSection/hooks/useNotifications"
import {processPowerLevelByNumber, UserPowerLevel} from "./members"

const POWER_LEVELS_LOCAL_STORAGE_KEY = "local_power_levels_notifications"

export enum NotificationType {
  Banned,
  Leaved,
  Invited,
  BanRemoved,
  RejectInvitation,
  UpgradeToAdmin,
  UpgradeToModerator,
  DowngradeToMember,
}

export const notificationsBody: {[key in NotificationType]: string} = {
  [NotificationType.Invited]: "has invited you to",
  [NotificationType.Banned]: "has banned you from",
  [NotificationType.Leaved]: "you have been kicked from",
  [NotificationType.RejectInvitation]: "you have rejected the invitation",
  [NotificationType.BanRemoved]: "your ban has been lifted in",
  [NotificationType.DowngradeToMember]: "you have been demoted to member in",
  [NotificationType.UpgradeToAdmin]: "you have been promoted to admin in",
  [NotificationType.UpgradeToModerator]:
    "you have been promoted to moderator in",
}

// #region Set and Get
export function getLocalPowerLevelsHistory(): PowerLevelNotificationData[] {
  const savedNotifications = localStorage.getItem(
    POWER_LEVELS_LOCAL_STORAGE_KEY
  )

  return savedNotifications ? JSON.parse(savedNotifications) : []
}

export function setLocalPowerLevelsHistory(
  notifications: PowerLevelNotificationData[]
) {
  localStorage.setItem(
    POWER_LEVELS_LOCAL_STORAGE_KEY,
    JSON.stringify(notifications)
  )
}

// #region Power level
export function notificationTypeTransformer(
  currentPowerLevel: UserPowerLevel | null,
  cachedPowerLevel: PowerLevelNotificationData | null
): NotificationType | null {
  const currentLevels = currentPowerLevel ?? UserPowerLevel.Member

  const previousLevels =
    cachedPowerLevel?.currentPowerLevel ?? UserPowerLevel.Member

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

export function getNotificationFromPowerLevelEvent(
  currentLevels: number,
  userId: string,
  cachedPowerLevelNotifications: PowerLevelNotificationData[]
): null {
  const powerLevelProcessed = processPowerLevelByNumber(currentLevels)

  return null
}
