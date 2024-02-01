/* eslint-disable tailwindcss/enforces-shorthand */
import {type IconProp} from "@fortawesome/fontawesome-svg-core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import Avatar from "boring-avatars"
import {type FC} from "react"
import {assert, trim, validateUrl} from "../utils/util"
import {twMerge} from "tailwind-merge"

export enum UserActivity {
  LISTENING = "Listening to",
}

export enum UserStatus {
  ONLINE,
  OFFLINE,
  IDLE,
}

export type UserProfileProps = {
  avatarUrl?: string
  text: string
  displayName: string
  displayNameColor: string
  status: UserStatus
  activity?: UserActivity
  icon?: IconProp
  platform?: string
  isLarge?: boolean
}

const UserProfile: FC<UserProfileProps> = ({
  displayName,
  displayNameColor,
  status,
  text,
  activity,
  avatarUrl,
  icon,
  isLarge,
  platform,
}) => {
  assert(displayName.length > 0, "display name should not be empty")
  assert(
    text !== undefined && text.length > 0,
    "username should not be undefined or empty"
  )

  // TODO: check undefined values of the activity, platform and icon.
  if (icon !== undefined) {
    assert(
      activity !== undefined || platform !== undefined,
      "User activity and platform should not be undefined"
    )
  } else if (activity !== undefined) {
    assert(
      icon !== undefined || platform !== undefined,
      "icon and platform should not be undefined or empty"
    )
  } else if (platform !== undefined) {
    assert(
      icon !== undefined || activity !== undefined,
      "icon and activity should not be undefined"
    )
  }

  if (avatarUrl !== undefined) {
    assert(validateUrl(avatarUrl), "avatar URL should be valid if defined")
  }

  const MAX_DISPLAY_NAME_LENGTH = 18
  let userStatusClassName: string

  switch (status) {
    case UserStatus.ONLINE:
      userStatusClassName = "bg-green-400"

      break
    case UserStatus.OFFLINE:
      userStatusClassName = "bg-gray-300"

      break
    case UserStatus.IDLE:
      userStatusClassName = "bg-yellow-500"

      break
  }

  const avatarImage =
    avatarUrl !== undefined ? (
      <img
        className={twMerge(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          isLarge
            ? "h-userProfileAvatarSizeLarge w-userProfileAvatarSizeLarge"
            : "h-userProfileAvatarSize w-userProfileAvatarSize"
        )}
        src={avatarUrl}
      />
    ) : (
      <Avatar size={isLarge ? 60 : 40} square name={text} variant="beam" />
    )

  const activityOrText =
    activity !== undefined ? (
      <span className="text-small">
        {activity + " "}

        <span className="font-strong">{platform}</span>
      </span>
    ) : (
      <span className="text-small">{text}</span>
    )

  return (
    <div className="flex gap-10px">
      <div className="relative">
        <div
          className={twMerge(
            "relative overflow-hidden rounded-10 bg-red-500",
            isLarge
              ? "h-avatarSizeLarge w-avatarSizeLarge"
              : "h-avatarSizeDefault w-avatarSizeDefault"
          )}>
          {avatarImage}
        </div>

        <div
          className={twMerge(
            "absolute rounded-50 border-2 border-solid border-neutral-50 translate-x-1/4 translate-y-1/4 right-0 bottom-0",
            isLarge
              ? "h-avatarStatusSizeLarge w-avatarStatusSizeLarge"
              : "h-avatarStatusSize w-avatarStatusSize",
            userStatusClassName
          )}
        />
      </div>

      <div className="mr-auto inline-flex flex-col gap-3px">
        <div
          style={{color: displayNameColor}}
          className="text-large font-strong">
          {trim(displayName, MAX_DISPLAY_NAME_LENGTH)}
        </div>

        <div className="flex items-center">
          {icon && (
            <FontAwesomeIcon icon={icon} className="mr-3px h-10px w-10px" />
          )}

          {activityOrText}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
