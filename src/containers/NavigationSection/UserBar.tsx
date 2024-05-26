import {type FC} from "react"

import IconButton from "../../components/IconButton"
import {twMerge} from "tailwind-merge"
import UserProfilePlaceholder from "../../components/UserProfilePlaceholder"
import {IoMdSettings} from "react-icons/io"
import AvatarImage, {AvatarType} from "@/components/Avatar"
import Typography, {TypographyVariant} from "@/components/Typography"

export type UserBarProps = {
  displayName: string
  displayNameColor: string
  userId: string
  avatarUrl?: string
  isLoading?: boolean
  className?: string
}

const UserBar: FC<UserBarProps> = ({
  className,
  displayName,
  displayNameColor,
  userId,
  isLoading = false,
}) => {
  return (
    <div className={twMerge("flex items-center p-3", className)}>
      <div className="mr-auto">
        {isLoading ? (
          <UserProfilePlaceholder />
        ) : (
          <div className="flex gap-2.5">
            <AvatarImage
              isRounded={false}
              avatarType={AvatarType.Profile}
              displayName={displayName}
            />

            <div className="flex flex-col">
              <Typography
                style={{color: displayNameColor}}
                className="line-clamp-1 font-bold">
                {displayName}
              </Typography>

              <Typography
                className="line-clamp-1"
                variant={TypographyVariant.P}>
                {userId}
              </Typography>
            </div>
          </div>
        )}
      </div>

      {/* TODO: Handle click on settings button. */}
      <IconButton onClick={() => {}} Icon={IoMdSettings} tooltip="Settings" />
    </div>
  )
}

export default UserBar
