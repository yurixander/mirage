import {type FC} from "react"
import "../styles/UserCard.sass"
import {timeFormatter} from "../util"
import Button, {ButtonStyle} from "./Button"
import Label from "./Label"
import UserProfile, {type UserProfileProps} from "./UserProfile"

export type UserCardProps = {
  userProfileProps: UserProfileProps
  aboutMe: string
  accountCreationTime: number
  serverJoinTime: number
  lastMessageTime: number
}

const UserCard: FC<UserCardProps> = ({
  aboutMe,
  accountCreationTime,
  lastMessageTime,
  serverJoinTime,
  userProfileProps,
}) => {
  // CONSIDER: Using a floating UI library to handle the positioning of this component.

  return (
    <div className="UserCard">
      <div className="header">
        <UserProfile {...userProfileProps} />
      </div>
      <div className="body">
        <div className="about-me">
          <Label text="About me" />
          <span className="about-content">{aboutMe}</span>
        </div>
        <div className="account">
          <Label text="Account" />
          <span>
            Created <b>{timeFormatter(accountCreationTime)}</b>
          </span>
          <span>
            Joined server <b>{timeFormatter(serverJoinTime)}</b>
          </span>
          <span>
            Last message sent was <b>{timeFormatter(lastMessageTime)}</b>
          </span>
        </div>
      </div>
      <div className="actions">
        <Button
          text="View messages ⟶"
          style={ButtonStyle.Default}
          onClick={() => {
            /* TODO: Handle click on View messages button. */
          }}
        />
      </div>
    </div>
  )
}

export default UserCard
