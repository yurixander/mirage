import {type FC} from "react"
import IconButton from "../../components/IconButton"
import {twMerge} from "tailwind-merge"
import UserProfilePlaceholder from "../../components/UserProfilePlaceholder"
import {IoMdSettings} from "react-icons/io"
import AvatarImage, {AvatarType} from "@/components/AvatarImage"
import Typography, {TypographyVariant} from "@/components/Typography"
import useUserData from "./hooks/useUserData"
import {getUsernameByUserId, stringToColor, trim} from "@/utils/util"

const MAX_USER_ID_LENGTH = 18

const UserBar: FC<{className?: string}> = ({className}) => {
  const {userData, isConnecting} = useUserData()

  return (
    <div className={twMerge("p-2", className)}>
      {isConnecting || userData === undefined ? (
        <UserProfilePlaceholder />
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5 overflow-hidden">
            <AvatarImage
              className="flex shrink-0"
              isRounded={false}
              avatarType={AvatarType.Profile}
              displayName={userData.displayName}
              avatarUrl={userData.avatarUrl}
            />

            <div className="flex flex-col">
              <Typography
                style={{color: stringToColor(userData.userId)}}
                className="line-clamp-1 font-bold">
                {userData.displayName}
              </Typography>

              <Typography
                className="line-clamp-1"
                variant={TypographyVariant.Body}>
                {trim(getUsernameByUserId(userData.userId), MAX_USER_ID_LENGTH)}
              </Typography>
            </div>
          </div>

          {/* TODO: Handle click on settings button. */}
          <IconButton
            onClick={() => {
              throw new Error("Configurations not implemented")
            }}
            Icon={IoMdSettings}
            tooltip="Settings"
          />
        </div>
      )}
    </div>
  )
}

export default UserBar
