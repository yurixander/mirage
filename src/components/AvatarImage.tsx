import Avatar from "boring-avatars"
import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export enum AvatarType {
  Profile,
  ProfileBar,
  Message,
}

export enum AvatarSize {
  ExtraSmall,
  Small,
  Normal,
  Large,
  ExtraLarge,
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
  avatarSize = AvatarSize.Normal,
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

const getAvatarSizeByTailwindClass = (size: AvatarSize): string => {
  switch (size) {
    case AvatarSize.ExtraSmall: {
      return "size-3"
    }

    case AvatarSize.Small: {
      return "size-6"
    }

    case AvatarSize.Normal: {
      return "size-10"
    }

    case AvatarSize.Large: {
      return "size-14"
    }

    case AvatarSize.ExtraLarge: {
      return "size-20"
    }
  }
}

const getAvatarSize = (size: AvatarSize): number => {
  switch (size) {
    case AvatarSize.ExtraSmall: {
      return 12
    }
    case AvatarSize.Small: {
      return 24
    }
    case AvatarSize.Normal: {
      return 40
    }
    case AvatarSize.Large: {
      return 56
    }
    case AvatarSize.ExtraLarge: {
      return 80
    }
  }
}

export default AvatarImage
