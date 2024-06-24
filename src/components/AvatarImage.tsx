import Avatar from "boring-avatars"
import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export enum AvatarType {
  Profile,
  ProfileBar,
  Message,
}

export enum AvatarSize {
  Small,
  Medium,
  Large,
  VeryLarge,
}

export type AvatarProps = {
  isRounded: boolean
  avatarType: AvatarType
  displayName: string
  isSquare?: boolean
  avatarUrl?: string
  avatarSize?: AvatarSize
  className?: string
}

const AvatarImage: FC<AvatarProps> = ({
  isRounded,
  isSquare = true,
  avatarType,
  displayName,
  avatarUrl,
  avatarSize = AvatarSize.Medium,
  className,
}) => {
  const isAvatarMessage = avatarType === AvatarType.Message
  const isProfile = avatarType === AvatarType.Profile

  return avatarUrl === undefined ? (
    <div
      className={twMerge(
        "shrink-0 overflow-hidden rounded-lg",
        isRounded && "rounded-full",
        getAvatarSizeByTailwindClass(avatarSize)
      )}>
      <Avatar
        size={getAvatarSize(avatarSize)}
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
          twMerge("object-contain", getAvatarSizeByTailwindClass(avatarSize)),
        // TODO: Class `rounded-full` should be parent container with `overflow-hidden`.
        isRounded && "rounded-full",
        className
      )}
      alt={displayName}
    />
  )
}

const getAvatarSizeByTailwindClass = (size: AvatarSize) => {
  switch (size) {
    case AvatarSize.Small: {
      return "size-5"
    }
    case AvatarSize.Medium: {
      return "size-9"
    }
    case AvatarSize.Large: {
      return "size-14"
    }
    case AvatarSize.VeryLarge: {
      return "size-28"
    }
  }
}

const getAvatarSize = (size: AvatarSize) => {
  switch (size) {
    case AvatarSize.Small: {
      return 20
    }
    case AvatarSize.Medium: {
      return 36
    }
    case AvatarSize.Large: {
      return 56
    }
    case AvatarSize.VeryLarge: {
      return 112
    }
  }
}

export default AvatarImage
