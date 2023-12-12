import UserProfile, {UserProfileProps} from "./UserProfile"
import "../styles/RosterUser.sass"

export type RosterUserProps = {
  userProfileProps: UserProfileProps,
  onClick: () => void
}

export default function RosterUser(props: RosterUserProps) {
  return (
    <div className="RosterUser" tabIndex={0}>
      <UserProfile {...props.userProfileProps} />
    </div>
  )
}
