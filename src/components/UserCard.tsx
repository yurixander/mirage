import {type FC} from "react"
import {timeFormatter} from "../utils/util"
import Button, {ButtonVariant} from "./Button"
import Label from "./Label"
import UserProfile, {
  type UserProfileProps as UserProfileProperties,
} from "./UserProfile"
import {createPortal} from "react-dom"

export type UserCardProps = {
  userProfileProps: UserProfileProperties
  aboutMe: string
  accountCreationTime: number
  serverJoinTime: number
  lastMessageTime: number
  onCancel: () => void
}

const UserCard: FC<UserCardProps> = ({
  aboutMe,
  accountCreationTime,
  lastMessageTime,
  serverJoinTime,
  userProfileProps,
  onCancel,
}) => {
  const chatMessagesBridge = document.querySelector("#messages")

  return (
    chatMessagesBridge &&
    createPortal(
      <div className="z-50 flex size-full justify-end px-1">
        <div
          className="absolute flex min-h-80 w-[250px] flex-col rounded-xl
    border border-neutral-300 bg-neutral-50 shadow-userCard">
          <div className="rounded-xl border-b border-solid border-b-neutral-300 bg-white p-4">
            <UserProfile {...userProfileProps} />
          </div>

          <div className="flex grow flex-col gap-4 bg-neutral-50 p-4">
            <div>
              <Label text="About me" />

              <span className="select-text text-xs">{aboutMe}</span>
            </div>

            <div className="flex flex-col gap-1">
              <Label text="Account" />

              <span className="text-xs">
                Created <b>{timeFormatter(accountCreationTime)}</b>
              </span>

              <span className="text-xs">
                Joined server <b>{timeFormatter(serverJoinTime)}</b>
              </span>

              <span className="text-xs">
                Last message sent was <b>{timeFormatter(lastMessageTime)}</b>
              </span>
            </div>
          </div>

          <div className="flex flex-row justify-end gap-1 rounded-b-[1px] border-t-[1px] border-solid border-neutral-300 bg-cardActionsBg p-3">
            <Button
              label="Cancel"
              variant={ButtonVariant.TextLink}
              onClick={onCancel}
            />

            <Button
              label="View messages ⟶"
              variant={ButtonVariant.Primary}
              onClick={() => {
                // TODO: Handle click on View messages button.
              }}
            />
          </div>
        </div>
      </div>,
      chatMessagesBridge
    )
  )
}

export default UserCard
