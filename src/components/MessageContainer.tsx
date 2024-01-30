/* eslint-disable tailwindcss/enforces-shorthand */
import {type FC} from "react"
import {timeFormatter} from "../utils/util"

export type MessageContainerProps = {
  authorDisplayName: string
  authorDisplayNameColor: string
  authorAvatarUrl: string
  content: JSX.Element
  timestamp: number
  onAuthorClick: () => void
}

const MessageContainer: FC<MessageContainerProps> = ({
  authorDisplayName,
  authorDisplayNameColor,
  authorAvatarUrl,
  content,
  timestamp,
  onAuthorClick,
}) => {
  const localeTimeString = timeFormatter(timestamp)

  return (
    <div className="flex w-full items-start justify-start">
      <div className="flex w-full gap-10px">
        <div
          className="flex h-avatarSize w-avatarSize cursor-pointer items-center
          justify-center overflow-hidden rounded-10 bg-neutral-50"
          onClick={() => {
            onAuthorClick()
          }}>
          <img className="size-full" src={authorAvatarUrl} />
        </div>

        <div className="w-full">
          <span
            className="select-text font-strong"
            style={{color: authorDisplayNameColor}}
            onClick={() => {
              onAuthorClick()
            }}>
            {authorDisplayName}
          </span>

          <div className="flex">
            {content}

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
