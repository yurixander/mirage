import {type FC} from "react"
import {assert, cleanDisplayName, trim, validateUrl} from "../utils/util"
import {twMerge} from "tailwind-merge"
import AvatarImage, {AvatarType} from "./Avatar"
import React from "react"

export type UserProfileProps = {
  avatarUrl?: string
  displayName: string
  displayNameColor: string
  children: React.JSX.Element
  isLarge?: boolean
  className?: string
}

const UserProfile: FC<UserProfileProps> = ({
  displayName,
  displayNameColor,
  avatarUrl,
  isLarge,
  children,
  className,
}) => {
  if (avatarUrl !== undefined) {
    assert(
      validateUrl(avatarUrl),
      `${avatarUrl} avatar URL should be valid if defined`
    )
  }

  const MAX_DISPLAY_NAME_LENGTH = 16

  return (
    <div className={twMerge("flex gap-2", className)}>
      <div className="relative">
        <div
          className={twMerge(
            "relative overflow-hidden rounded-lg bg-red-500",
            isLarge ? "size-[50px]" : "size-[37px]"
          )}>
          <AvatarImage
            isRounded={false}
            isLarge={isLarge ?? false}
            avatarType={AvatarType.Profile}
            displayName={displayName}
            avatarUrl={avatarUrl}
          />
        </div>
      </div>

      {/* TODO: Update this to use `Typography` */}
      <div className="mr-auto inline-flex flex-col gap-[2px]">
        <div
          style={{color: displayNameColor}}
          className="line-clamp-1 text-sm font-bold leading-[100%] text-slate-500">
          {trim(cleanDisplayName(displayName), MAX_DISPLAY_NAME_LENGTH)}
        </div>

        {children}
      </div>
    </div>
  )
}

export default UserProfile
