import {type FC} from "react"
import {cleanDisplayName, timeFormatter} from "../utils/util"
import AvatarImage, {AvatarType} from "./AvatarImage"
import React from "react"

export type MessageBaseProps = {
  authorAvatarUrl?: string
  authorDisplayName: string
  authorDisplayNameColor: string
  timestamp: number
  id: string
  text: string
  onDeleteMessage?: () => void
  onAuthorClick: () => void
}

export type MessageContainerProps = {
  authorDisplayName: string
  authorDisplayNameColor: string
  authorAvatarUrl?: string
  children: React.JSX.Element
  timestamp: number
  onAuthorClick: () => void
  onMessageRightClick: <T>(e: React.MouseEvent<T>) => void
}

const MessageContainer: FC<MessageContainerProps> = ({
  authorDisplayName,
  authorDisplayNameColor,
  authorAvatarUrl,
  children,
  timestamp,
  onAuthorClick,
  onMessageRightClick,
}) => {
  const localeTimeString = timeFormatter(timestamp)

  return (
    <div
      className="flex w-full items-start justify-start"
      onContextMenu={onMessageRightClick}>
      <div className="flex w-full gap-3">
        <div
          className="flex size-10 cursor-pointer items-center justify-center
          overflow-hidden rounded-lg bg-neutral-50"
          onClick={() => {
            onAuthorClick()
          }}
          aria-hidden="true">
          <AvatarImage
            isRounded={false}
            isLarge={false}
            avatarType={AvatarType.Message}
            displayName={cleanDisplayName(authorDisplayName)}
            avatarUrl={authorAvatarUrl}
          />
        </div>

        <div className="w-full">
          <span
            className="select-text font-semibold"
            style={{color: authorDisplayNameColor}}
            onClick={onAuthorClick}
            aria-hidden="true">
            {authorDisplayName}
          </span>

          <div className="flex w-full justify-between">
            {children}

            <time className="flex text-gray-300">{localeTimeString}</time>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageContainer
