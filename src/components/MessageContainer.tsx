import {type FC} from "react"
import "../styles/MessageContainer.sass"
import {timeFormatter} from "../util"

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
    <div className="MessageContainer">
      <div className="wrapper">
        <div
          className="avatar"
          onClick={() => {
            onAuthorClick()
          }}>
          <img src={authorAvatarUrl} />
        </div>
        <div className="body">
          <span
            className="author-name"
            style={{color: authorDisplayNameColor}}
            onClick={() => {
              onAuthorClick()
            }}>
            {authorDisplayName}
          </span>
          <div className="content">
            {content}
            <time className="time">{localeTimeString}</time>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageContainer
