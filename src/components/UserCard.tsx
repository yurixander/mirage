import {type FC} from "react"
import {timeFormatter} from "../utils/util"
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

const UserCard: FC<UserCardProps> = ({
  aboutMe,
  accountCreationTime,
  lastMessageTime,
  serverJoinTime,
  userProfileProps,
}) => {
  // CONSIDER: Using a floating UI library to handle the positioning of this component.

  return (
    <div
      className="absolute flex min-h-80 w-userCardSize flex-col rounded-10
    border-1 border-solid border-border bg-contrast shadow-userCard">
      <div className="rounded-10 border-b-1 border-solid border-b-border bg-white p-x1">
        <UserProfile {...userProfileProps} />
      </div>

      <div className="flex grow flex-col gap-x1 bg-contrast p-x1">
        <div>
          <Label text="About me" />
          <span className="select-text text-small">{aboutMe}</span>
        </div>

        <div className="flex flex-col gap-5px">
          <Label text="Account" />

          <span className="text-small">
            Created <b>{timeFormatter(accountCreationTime)}</b>
          </span>

          <span className="text-small">
            Joined server <b>{timeFormatter(serverJoinTime)}</b>
          </span>

          <span className="text-small">
            Last message sent was <b>{timeFormatter(lastMessageTime)}</b>
          </span>
        </div>
      </div>

      <div className="flex flex-row justify-end rounded-b-1 border-t-1 border-solid border-border bg-cardActionsBg p-10px">
        <Button
          label="View messages ⟶"
          variant={ButtonVariant.Default}
          onClick={() => {
            /* TODO: Handle click on View messages button. */
          }}
        />
      </div>
    </div>
  )
}

export default UserCard
