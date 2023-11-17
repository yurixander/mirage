import "../styles/UserCard.sass"
import Button, {ButtonStyle} from "./Button"
import Label from "./Label"
import UserProfile, {UserProfileProps} from "./UserProfile"

export type UserCardProps = {
  userProfileProps: UserProfileProps
  aboutMe: string,
  accountCreationTime: number,
  serverJoinTime: number,
  lastMessageTime: number
}

export default function UserCard(props: UserCardProps) {
  //FIXME: This is temporary. Proper formatting is needed. Will require a specialized library.
  const accountCreationTime = new Date(props.accountCreationTime).toLocaleTimeString()
  const serverJoinTime = new Date(props.serverJoinTime).toLocaleTimeString()
  const lastMessageTime = new Date(props.lastMessageTime).toLocaleTimeString()

  return (
    <div className="UserCard">
      <div className="header">
        <UserProfile {...props.userProfileProps} />
      </div>
      <div className="body">
        <div className="about-me">
          <Label text="About me" />
          <span className="about-content">{props.aboutMe}</span>
        </div>
        <div className="account">
          <Label text="Account" />
          <span className="created">Created <b>{accountCreationTime}</b></span>
          <span>Joined server <b>{serverJoinTime}</b></span>
          <span>Last message sent was <b>{lastMessageTime}</b></span>
        </div>
      </div>
      <div className="actions">
        <Button
          text="View messages ⟶"
          style={ButtonStyle.Default}
          onClick={() => {/* TODO: Handle click on View messages button. */}} />
      </div>
    </div>
  )
}
