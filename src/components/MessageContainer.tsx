/* eslint-disable tailwindcss/enforces-shorthand */
import {type FC} from "react"
import {timeFormatter} from "../utils/util"

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

  return (
    <div className="flex w-full items-start justify-start">
      <div className="flex w-full gap-3">
        <div
          className="flex h-[40px] w-[40px] cursor-pointer items-center
          justify-center overflow-hidden rounded-lg bg-neutral-50"
          onClick={() => {
            onAuthorClick()
          }}>
          <img className="size-full" src={authorAvatarUrl} />
        </div>

        <div className="w-full">
          <span
            className="select-text font-semibold"
            style={{color: authorDisplayNameColor}}
            onClick={() => {
              onAuthorClick()
            }}>
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
