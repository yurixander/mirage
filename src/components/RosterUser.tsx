import {type FC} from "react"
import UserProfile, {
  type UserProfileProps as UserProfileProperties,
} from "./UserProfile"

export enum UserPowerLevel {
  Admin,
  Moderator,
  Member,
}

export type RosterUserProps = {
  userProfileProps: UserProfileProperties
  powerLevel: UserPowerLevel
  userId: string
  onClick: () => void
}

const RosterUser: FC<RosterUserProps> = ({userProfileProps, onClick}) => {
  return (
    <div
      onClick={onClick}
      className="w-full cursor-pointer p-1 hover:rounded-xl hover:bg-neutral-100 focus-visible:rounded-md focus-visible:border-2 focus-visible:border-outlineTab focus-visible:outline-none focus-visible:transition focus-visible:duration-150"
      aria-hidden="true">
      <UserProfile {...userProfileProps} />
    </div>
  )
}

export default RosterUser
