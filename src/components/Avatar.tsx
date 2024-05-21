import {cleanDisplayName} from "@/utils/util"
import Avatar from "boring-avatars"
import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export enum AvatarType {
  Profile,
  ProfileBar,
  Message,
}

export type AvatarProps = {
  isRounded: boolean
  avatarType: AvatarType
  displayName: string
  isLarge?: boolean
  isSquare?: boolean
  avatarUrl?: string
  className?: string
}

const AvatarImage: FC<AvatarProps> = ({
  isRounded,
  isLarge = false,
  isSquare = true,
  avatarType,
  displayName,
  avatarUrl,
  className,
}) => {
  const isAvatarMessage = avatarType === AvatarType.Message
  const isProfile = avatarType === AvatarType.Profile

  return avatarUrl === undefined ? (
    <div
      className={twMerge(
        "overflow-hidden rounded-lg",
        isRounded && "rounded-full"
      )}>
      <Avatar
        size={isProfile && isLarge ? 60 : 40}
        square={isSquare}
        name={displayName}
        variant="beam"
      />
    </div>
  ) : (
    <img
      src={avatarUrl}
      className={twMerge(
        isAvatarMessage && "size-full",
        isProfile &&
          twMerge(
            "object-contain",
            isLarge
              ? "h-userProfileAvatarSizeLarge w-userProfileAvatarSizeLarge"
              : "h-10 w-10"
          ),
        // TODO: Class `rounded-full` should be parent container with `overflow-hidden`.
        isRounded && "rounded-full",
        className
      )}
      alt={displayName}
    />
  )
}

export default AvatarImage
