import {type FC} from "react"
import {cleanDisplayName, timeFormatter} from "../utils/util"
import Avatar from "boring-avatars"

export type MessageBaseProps = {
  authorAvatarUrl?: string
  authorDisplayName: string
  authorDisplayNameColor: string
  timestamp: number
  id: string
  text: string
  onDeleteMessage: () => void
  onAuthorClick: () => void
}

export type MessageContainerProps = {
  authorDisplayName: string
  authorDisplayNameColor: string
  authorAvatarUrl?: string
  children: JSX.Element
  timestamp: number
  onAuthorClick: () => void
}

const MessageContainer: FC<MessageContainerProps> = ({
  authorDisplayName,
  authorDisplayNameColor,
  authorAvatarUrl,
  children,
  timestamp,
  onAuthorClick,
}) => {
  const localeTimeString = timeFormatter(timestamp)

  const avatarImage =
    authorAvatarUrl !== undefined ? (
      <img src={authorAvatarUrl} className="size-full" />
    ) : (
      <Avatar
        size={40}
        square
        name={cleanDisplayName(authorDisplayName)}
        variant="beam"
      />
    )

  return (
    <div className="flex w-full items-start justify-start">
      <div className="flex w-full gap-3">
        <div
          className="flex size-[40px] cursor-pointer items-center justify-center
          overflow-hidden rounded-lg bg-neutral-50"
          onClick={() => {
            onAuthorClick()
          }}>
          {avatarImage}
        </div>

        <div className="w-full">
          <span
            className="select-text font-semibold"
            style={{color: authorDisplayNameColor}}
            onClick={onAuthorClick}>
            {authorDisplayName}
          </span>

          <div className="flex">
            {children}

            <time className="ml-auto flex text-gray-300">
              {localeTimeString}
            </time>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageContainer
