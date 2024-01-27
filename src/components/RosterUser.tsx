import {type FC} from "react"
import UserProfile, {type UserProfileProps} from "./UserProfile"

export type RosterUserProps = {
  userProfileProps: UserProfileProps
  onClick: () => void
}

const RosterUser: FC<RosterUserProps> = ({userProfileProps, onClick}) => {
  return (
    <div
      className="w-max cursor-pointer p-5px focus-visible:rounded-5 focus-visible:border-2 focus-visible:border-solid focus-visible:border-outlineTab focus-visible:outline-none focus-visible:transition focus-visible:duration-150"
      tabIndex={0}>
      <UserProfile {...userProfileProps} />
    </div>
  )
}

export default RosterUser
