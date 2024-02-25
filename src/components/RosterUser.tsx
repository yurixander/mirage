import {type FC} from "react"
import UserProfile, {type UserProfileProps} from "./UserProfile"

export enum UserPowerLevel {
  Admin,
  Moderator,
  Member,
}

export type RosterUserProps = {
  userProfileProps: UserProfileProps
  powerLevel: UserPowerLevel
  userId: string
  onClick: () => void
}

const RosterUser: FC<RosterUserProps> = ({userProfileProps, onClick}) => {
  return (
    <div
      className="w-full cursor-pointer p-[5px] hover:rounded-xl hover:bg-neutral-100 focus-visible:rounded-md focus-visible:border-[2px] focus-visible:border-solid focus-visible:border-outlineTab focus-visible:outline-none focus-visible:transition focus-visible:duration-150"
      tabIndex={0}>
      <UserProfile {...userProfileProps} />
    </div>
  )
}

export default RosterUser
