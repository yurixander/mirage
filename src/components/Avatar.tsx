import {cleanDisplayName} from "@/utils/util"
import Avatar from "boring-avatars"
import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export enum AvatarType {
  Profile,
  Server,
  Message,
}

export type AvatarProps = {
  isRounded: boolean
  isLarge: boolean
  avatarType: AvatarType
  displayName: string
  avatarUrl?: string
}

const AvatarImage: FC<AvatarProps> = ({
  isRounded,
  isLarge,
  avatarType = AvatarType.Profile,
  displayName,
  avatarUrl,
}) => {
  const isAvatarMessage = avatarType === AvatarType.Message
  const isAvatarServer = avatarType === AvatarType.Server
  const isProfile = avatarType === AvatarType.Profile

  return avatarUrl === undefined ? (
    <Avatar
      size={isAvatarServer ? 47 : isProfile && isLarge ? 60 : 40}
      square
      name={cleanDisplayName(displayName)}
      variant={isAvatarServer ? "bauhaus" : "beam"}
    />
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
        isRounded && "rounded-full"
      )}
      alt={displayName}
    />
  )
}

export default AvatarImage
