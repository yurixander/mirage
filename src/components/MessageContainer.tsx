import {type FC} from "react"
import {cleanDisplayName, timeFormatter} from "../utils/util"
import AvatarImage, {AvatarType} from "./AvatarImage"
import React from "react"
import Typography, {TypographyVariant} from "./Typography"

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

  return (
    <div className="flex w-full items-start justify-start">
      <div className="flex w-full gap-3">
        <button
          className="size-10 shrink-0 cursor-pointer overflow-hidden rounded-lg bg-neutral-50"
          onClick={onAuthorClick}>
          <AvatarImage
            isRounded={false}
            avatarType={AvatarType.Message}
            displayName={cleanDisplayName(authorDisplayName)}
            avatarUrl={authorAvatarUrl}
          />
        </button>

        <div className="w-full">
          <Typography
            className="w-max select-text font-bold"
            style={{color: authorDisplayNameColor}}
            onClick={onAuthorClick}
            variant={TypographyVariant.Body}>
            {cleanDisplayName(authorDisplayName)}
          </Typography>

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
