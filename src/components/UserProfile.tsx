import {type FC} from "react"
import {assert, cleanDisplayName, trim, validateUrl} from "../utils/util"
import {twMerge} from "tailwind-merge"
import AvatarImage, {AvatarType} from "./Avatar"

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
  status?: UserStatus
  activity?: UserActivity
  icon?: React.JSX.Element
  platform?: string
  isLarge?: boolean
  className?: string
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
  className,
}) => {
  const hasIcon = icon !== undefined
  const hasActivity = activity !== undefined
  const hasPlatform = platform !== undefined

  assert(displayName.length > 0, "display name should not be empty")

  assert(
    text !== undefined && text.length > 0,
    "username should not be undefined or empty"
  )

  // TODO: check undefined values of the activity, platform and icon.
  if (hasIcon) {
    assert(
      hasActivity || hasPlatform,
      "User activity and platform should not be undefined"
    )
  } else if (hasActivity) {
    assert(
      hasIcon || hasPlatform,
      "icon and platform should not be undefined or empty"
    )
  } else if (hasPlatform) {
    assert(hasIcon || hasActivity, "icon and activity should not be undefined")
  }

  if (avatarUrl !== undefined) {
    assert(validateUrl(avatarUrl), "avatar URL should be valid if defined")
  }

  const MAX_DISPLAY_NAME_LENGTH = 12
  let userStatusClass: string | null = null

  switch (status) {
    case UserStatus.Online: {
      userStatusClass = "bg-green-400"

      break
    }
    case UserStatus.Offline: {
      userStatusClass = "bg-gray-300"

      break
    }
    case UserStatus.Idle: {
      userStatusClass = "bg-yellow-500"

      break
    }
    case undefined: {
      break
    }
  }

  const activityOrText =
    activity === undefined ? (
      <span className="text-xs">{text}</span>
    ) : (
      <span className="text-xs">
        {activity + " "}

        <span className="font-semibold leading-[100%]">{platform}</span>
      </span>
    )

  return (
    <div className={twMerge("flex gap-2", className)}>
      <div className="relative">
        <div
          className={twMerge(
            "relative overflow-hidden rounded-lg bg-red-500",
            isLarge ? "h-[50px] w-[50px]" : "h-[37px] w-[37px]"
          )}>
          <AvatarImage
            isRounded={false}
            isLarge={isLarge ?? false}
            avatarType={AvatarType.Profile}
            displayName={displayName}
            avatarUrl={avatarUrl}
          />
        </div>

        {userStatusClass !== undefined && (
          <div
            className={twMerge(
              "absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 rounded-[50%] border-[2px] border-solid border-neutral-50",
              isLarge ? "h-[17px] w-[17px]" : "h-[13px] w-[13px]",
              userStatusClass
            )}
          />
        )}
      </div>

      <div className="mr-auto inline-flex flex-col gap-[2px]">
        <div
          style={{color: displayNameColor}}
          className="text-base font-semibold leading-[100%]">
          {trim(cleanDisplayName(displayName), MAX_DISPLAY_NAME_LENGTH)}
        </div>

        <div className="flex items-center">
          {icon && <div className="mr-[3px] size-[10px]">{icon}</div>}
          {activityOrText}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
