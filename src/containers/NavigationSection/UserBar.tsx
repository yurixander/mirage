import {type FC} from "react"
import IconButton from "../../components/IconButton"
import {twMerge} from "tailwind-merge"
import UserProfilePlaceholder from "../../components/UserProfilePlaceholder"
import {IoMdSettings} from "react-icons/io"
import AvatarImage, {AvatarType} from "@/components/Avatar"
import Typography, {TypographyVariant} from "@/components/Typography"
import useUserData from "./hooks/useUserData"
import {stringToColor} from "@/utils/util"

const UserBar: FC<{className?: string}> = ({className}) => {
  const {userData, isConnecting} = useUserData()

  return (
    <div className={twMerge("flex items-center p-3", className)}>
      <div className="mr-auto">
        {isConnecting || userData === undefined ? (
          <UserProfilePlaceholder />
        ) : (
          <div className="flex gap-2.5">
            <AvatarImage
              isRounded={false}
              avatarType={AvatarType.Profile}
              displayName={userData.displayName}
            />

            <div className="flex flex-col">
              <Typography
                style={{color: stringToColor(userData.userId)}}
                className="line-clamp-1 font-bold">
                {userData?.displayName}
              </Typography>

              <Typography
                className="line-clamp-1"
                variant={TypographyVariant.P}>
                {userData.userId}
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
