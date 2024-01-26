import UserProfile, {type UserProfileProps} from "./UserProfile"
import "../styles/RosterUser.sass"
import {type FC} from "react"

export type RosterUserProps = {
  userProfileProps: UserProfileProps
  onClick: () => void
}

const RosterUser: FC<RosterUserProps> = ({userProfileProps, onClick}) => {
  return (
    <div className="RosterUser" tabIndex={0}>
      <UserProfile {...userProfileProps} />
    </div>
  )
}

export default RosterUser
