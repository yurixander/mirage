import {useMemo, type FC} from "react"
import {
  assert,
  CommonAssertion,
  getImageUrl,
  stringToColor,
  trim,
} from "../utils/util"
import IconButton from "./IconButton"
import UserProfile, {
  type UserProfileProps as UserProfileProperties,
  UserStatus,
} from "./UserProfile"
import {twMerge} from "tailwind-merge"
import useConnection from "@/hooks/matrix/useConnection"
import UserProfilePlaceholder from "./UserProfilePlaceholder"
import {IoMdSettings} from "react-icons/io"

export type UserBarProps = {
  className?: string
}

export function getUsernameByUserId(userId: string): string {
  return userId.replace(":matrix.org", "")
}

const UserBar: FC<UserBarProps> = ({className}) => {
  const MAX_NAME_LENGTH = 18
  const {client, isConnecting} = useConnection()

  const userData = useMemo(() => {
    if (client === null) {
      return
    }

    const userId = client.getUserId()

    // TODO: Improve this so that the user's credentials are obtained if they log in.
    assert(userId !== null, CommonAssertion.UserIdNotFound)

    const user = client.getUser(userId)

    assert(
      user !== null,
      "Your same user should exist for there to be a session."
    )

    const avatarUrl = user.avatarUrl
    const displayName = user.displayName ?? userId

    const status = client.isLoggedIn()
      ? UserStatus.Online
      : isConnecting
        ? UserStatus.Idle
        : UserStatus.Offline

    const userBarProperties: UserProfileProperties = {
      avatarUrl: getImageUrl(avatarUrl, client),
      displayName: trim(displayName, MAX_NAME_LENGTH),
      text: trim(getUsernameByUserId(userId), MAX_NAME_LENGTH),
      displayNameColor: stringToColor(userId),
      status,
    }

    return userBarProperties
  }, [client, isConnecting])

  return (
    <div className={twMerge("flex p-[x1]", className)}>
      <div className="mr-auto">
        {userData ? (
          <UserProfile {...userData} isLarge={false} />
        ) : (
          <UserProfilePlaceholder />
        )}
      </div>

      {/* TODO: Handle click on settings button. */}
      <IconButton onClick={() => {}} Icon={IoMdSettings} tooltip="Settings" />
    </div>
  )
}

export default UserBar
