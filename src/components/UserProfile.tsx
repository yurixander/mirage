import {type FC} from "react"
import {assert, cleanDisplayName, trim, validateUrl} from "../utils/util"
import {twMerge} from "tailwind-merge"
import AvatarImage, {AvatarSize, AvatarType} from "./AvatarImage"
import React from "react"
import {Heading} from "./ui/typography"

export type UserProfileProps = {
  displayName: string
  displayNameColor: string
  children: React.JSX.Element
  avatarType?: AvatarType
  isNameShorted?: boolean
  avatarUrl?: string
  isLarge?: boolean
  isSquare?: boolean
  className?: string
}

const UserProfile: FC<UserProfileProps> = ({
  displayName,
  displayNameColor,
  avatarUrl,
  children,
  isLarge = false,
  isNameShorted = true,
  isSquare = true,
  avatarType = AvatarType.Profile,
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
      <AvatarImage
        isRounded={false}
        avatarSize={AvatarSize.Normal}
        avatarType={avatarType}
        displayName={displayName}
        avatarUrl={avatarUrl}
        isSquare={isSquare}
      />

      <div className="flex flex-col items-start gap-0.5">
        <Heading
          style={{color: displayNameColor}}
          level={isLarge ? "h5" : "h6"}
          className="line-clamp-1 leading-[100%] text-slate-500">
          {isNameShorted
            ? trim(cleanDisplayName(displayName), MAX_DISPLAY_NAME_LENGTH)
            : displayName}
        </Heading>

        {children}
      </div>
    </div>
  )
}

export default UserProfile
