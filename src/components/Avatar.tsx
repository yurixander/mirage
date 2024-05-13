import {cleanDisplayName} from "@/utils/util"
import Avatar from "boring-avatars"
import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export enum AvatarType {
  Profile,
  ProfileBar,
  Server,
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
  const isAvatarServer = avatarType === AvatarType.Server
  const isProfile = avatarType === AvatarType.Profile

  return avatarUrl === undefined ? (
    <div
      className={twMerge(
        "overflow-hidden rounded-lg",
        isRounded && "rounded-full"
      )}>
      <Avatar
        size={isAvatarServer ? 47 : isProfile && isLarge ? 60 : 40}
        square={isSquare}
        name={cleanDisplayName(displayName)}
        variant={isAvatarServer ? "bauhaus" : "beam"}
      />
    </div>
  ) : (
    <img
      src={avatarUrl}
      className={twMerge(
        isAvatarMessage && "size-full",
        isAvatarServer &&
          "absolute left-1/2 top-1/2 size-serverAvatarSize -translate-x-1/2 -translate-y-1/2",
        isProfile &&
          twMerge(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain",
            isLarge
              ? "h-userProfileAvatarSizeLarge w-userProfileAvatarSizeLarge"
              : "h-userProfileAvatarSize w-userProfileAvatarSize"
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
