import UserProfile, {UserProfileProps} from "./UserProfile"

export type RosterUserProps = {
  userProfileProps: UserProfileProps,
  onClick: () => void
}

export default function RosterUser(props: RosterUserProps) {
  return (
    <UserProfile {...props.userProfileProps} />
  )
}
