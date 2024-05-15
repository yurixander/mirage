import {type FC} from "react"
import UserProfile from "../../components/UserProfile"
import {stringToColor, timeFormatter} from "@/utils/util"

export enum UserPowerLevel {
  Admin = 100,
  Moderator = 50,
  Member = 0,
}

export type RosterUserProps = {
  displayName: string
  powerLevel: UserPowerLevel
  userId: string
  lastPresenceAge: number
  avatarUrl?: string
  onClick: () => void
}

const RosterUser: FC<RosterUserProps> = ({
  onClick,
  lastPresenceAge,
  displayName,
  userId,
  avatarUrl,
}) => {
  return (
    <div
      onClick={onClick}
      className="w-full cursor-pointer p-1 hover:rounded-xl hover:bg-neutral-100 focus-visible:rounded-md focus-visible:border-2 focus-visible:border-outlineTab focus-visible:outline-none focus-visible:transition focus-visible:duration-150"
      aria-hidden="true">
      <UserProfile
        avatarUrl={avatarUrl}
        text={`Last presence age ${timeFormatter(lastPresenceAge)}`}
        displayName={displayName}
        displayNameColor={stringToColor(userId)}
      />
    </div>
  )
}

export default RosterUser
