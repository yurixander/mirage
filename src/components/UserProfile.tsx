/* eslint-disable tailwindcss/enforces-shorthand */
import {type IconProp} from "@fortawesome/fontawesome-svg-core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import Avatar from "boring-avatars"
import {type FC} from "react"
import {assert, trim, validateUrl} from "../utils/util"
import {twMerge} from "tailwind-merge"

export enum UserActivity {
  Listening = "Listening to",
}

export enum UserStatus {
  Online,
  Offline,
  Idle,
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
    case UserStatus.Online:
      userStatusClassName = "bg-green-400"

      break
    case UserStatus.Offline:
      userStatusClassName = "bg-gray-300"

      break
    case UserStatus.Idle:
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
      <span className="text-xs">
        {activity + " "}

        <span className="font-semibold">{platform}</span>
      </span>
    ) : (
      <span className="text-xs">{text}</span>
    )

  return (
    <div className="flex gap-3">
      <div className="relative">
        <div
          className={twMerge(
            "relative overflow-hidden rounded-[3px] bg-red-500",
            isLarge ? "h-[50px] w-[50px]" : "h-[37px] w-[37px]"
          )}>
          {avatarImage}
        </div>

        <div
          className={twMerge(
            "absolute rounded-[50%] border-[2px] border-solid border-neutral-50 translate-x-1/4 translate-y-1/4 right-0 bottom-0",
            isLarge ? "h-[17px] w-[17px]" : "h-[13px] w-[13px]",
            userStatusClassName
          )}
        />
      </div>

      <div className="mr-auto inline-flex flex-col gap-1">
        <div
          style={{color: displayNameColor}}
          className="text-base font-semibold">
          {trim(displayName, MAX_DISPLAY_NAME_LENGTH)}
        </div>

        <div className="flex items-center">
          {icon && <FontAwesomeIcon icon={icon} className="mr-1 h-3 w-3" />}

          {activityOrText}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
