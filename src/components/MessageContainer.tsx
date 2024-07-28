import {type FC} from "react"
import {cleanDisplayName, formatTime} from "../utils/util"
import AvatarImage, {AvatarType} from "./AvatarImage"
import React from "react"
import Typography, {TypographyVariant} from "./Typography"
import {type ContextMenuItem} from "./ContextMenu"

export type MessageBaseProps = {
  authorAvatarUrl?: string
  authorDisplayName: string
  authorDisplayNameColor: string
  timestamp: number
  id: string
  text: string
  contextMenuItems: ContextMenuItem[]
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
  const localeTimeString = formatTime(timestamp)

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

            <time className="min-w-16 text-right text-gray-300">
              {localeTimeString}
            </time>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageContainer
