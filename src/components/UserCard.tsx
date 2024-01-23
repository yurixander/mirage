import "../styles/UserCard.sass"
import {timeFormatter} from "../util"
import Button, {ButtonVariant} from "./Button"
import Label from "./Label"
import UserProfile, {type UserProfileProps} from "./UserProfile"

export type UserCardProps = {
  userProfileProps: UserProfileProps
  aboutMe: string
  accountCreationTime: number
  serverJoinTime: number
  lastMessageTime: number
}

export default function UserCard(props: UserCardProps) {
  // CONSIDER: Using a floating UI library to handle the positioning of this component.

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

          <span>
            Created <b>{timeFormatter(props.accountCreationTime)}</b>
          </span>

          <span>
            Joined server <b>{timeFormatter(props.serverJoinTime)}</b>
          </span>

          <span>
            Last message sent was <b>{timeFormatter(props.lastMessageTime)}</b>
          </span>
        </div>
      </div>

      <div className="actions">
        <Button
          text="View messages ⟶"
          variant={ButtonVariant.Default}
          onClick={() => {
            /* TODO: Handle click on View messages button. */
          }}
        />
      </div>
    </div>
  )
}
