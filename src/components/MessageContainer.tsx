import type {FC} from "react"
import type React from "react"
import {
  assert,
  CommonAssertion,
  cleanDisplayName,
  formatTime,
  validateUrl,
} from "../utils/util"
import AvatarImage, {AvatarType} from "./AvatarImage"
import type {ContextMenuItem} from "./ContextMenu"
import Typography, {TypographyVariant} from "./Typography"

export interface MessageBaseProps extends MessageBaseData {
  contextMenuItems: ContextMenuItem[]
  onAuthorClick: (userId: string) => void
}

export type MessageBaseData = {
  userId: string
  authorDisplayName: string
  timestamp: number
  messageId: string
  authorDisplayNameColor?: string
  authorAvatarUrl?: string
  isDeleted?: boolean
  canDeleteMessage?: boolean
}

export interface MessageContainerProps {
  userId: string
  authorDisplayName: string
  authorDisplayNameColor?: string
  authorAvatarUrl?: string
  children: React.JSX.Element
  timestamp: number
  onAuthorClick: (userId: string) => void
}

const MessageContainer: FC<MessageContainerProps> = ({
  authorDisplayName,
  authorDisplayNameColor,
  authorAvatarUrl,
  children,
  timestamp,
  onAuthorClick,
  userId,
}) => {
  const localeTimeString = formatTime(timestamp)

  if (authorAvatarUrl !== undefined) {
    assert(validateUrl(authorAvatarUrl), CommonAssertion.AvatarUrlNotValid)
  }

  assert(userId.length > 0, "The userId should not be empty.")

  return (
    <div className="flex w-full items-start justify-start">
      <div className="flex w-full gap-3">
        <button
          className="size-10 shrink-0 cursor-pointer overflow-hidden rounded-lg bg-neutral-50"
          onClick={() => {
            onAuthorClick(userId)
          }}>
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
            onClick={() => {
              onAuthorClick(userId)
            }}
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
