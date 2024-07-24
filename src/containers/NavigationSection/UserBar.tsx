import {type FC} from "react"
import IconButton from "../../components/IconButton"
import {twMerge} from "tailwind-merge"
import {IoMdSettings} from "react-icons/io"
import AvatarImage, {AvatarType} from "@/components/AvatarImage"
import Typography, {TypographyVariant} from "@/components/Typography"
import {
  assert,
  getUsernameByUserId,
  stringToColor,
  trim,
  validateUrl,
} from "@/utils/util"
import LoadingEffect from "@/components/LoadingEffect"

const MAX_USER_ID_LENGTH = 18

type UserBarProps = {
  isLoading: boolean
  userId: string
  displayName: string
  avatarImageUrl?: string
  className?: string
}

const UserBar: FC<UserBarProps> = ({
  isLoading,
  avatarImageUrl,
  displayName,
  userId,
  className,
}) => {
  assert(displayName.length > 0, "Display name should not be empty")
  assert(userId.length > 0, "User id should not be empty")

  if (avatarImageUrl !== undefined) {
    assert(
      validateUrl(avatarImageUrl),
      "Avatar image url should be valid if defined"
    )
  }

  return (
    <div className={twMerge("max-h-14 p-2", className)}>
      <div className="flex items-center justify-between">
        {isLoading ? (
          <UserBarPlaceHolder />
        ) : (
          <div className="flex gap-1.5 overflow-hidden">
            <AvatarImage
              className="flex shrink-0"
              isRounded
              avatarType={AvatarType.Profile}
              displayName={displayName}
              avatarUrl={avatarImageUrl}
            />

            <div className="flex flex-col">
              <Typography
                variant={TypographyVariant.BodyMedium}
                style={{color: stringToColor(userId)}}
                className="line-clamp-1 font-bold">
                {displayName}
              </Typography>

              <Typography
                className="line-clamp-1"
                variant={TypographyVariant.BodySmall}>
                {trim(getUsernameByUserId(userId), MAX_USER_ID_LENGTH)}
              </Typography>
            </div>
          </div>
        )}

        {/* TODO: Handle click on settings button. */}
        <IconButton
          onClick={() => {
            throw new Error("Configurations not implemented")
          }}
          Icon={IoMdSettings}
          tooltip="Settings"
        />
      </div>
    </div>
  )
}

const UserBarPlaceHolder: FC = () => {
  return (
    <div className="flex gap-1.5">
      <div className="size-9 overflow-hidden rounded-full bg-neutral-300">
        <LoadingEffect />
      </div>

      <div className="flex flex-col gap-1">
        <div className="h-4 w-20 overflow-hidden rounded-lg bg-neutral-300">
          <LoadingEffect />
        </div>

        <div className="h-3 w-14 overflow-hidden rounded-md bg-neutral-300">
          <LoadingEffect />
        </div>
      </div>
    </div>
  )
}

export default UserBar
