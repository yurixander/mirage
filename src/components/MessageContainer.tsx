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

export default function MessageContainer(props: MessageContainerProps) {
  const localeTimeString = timeFormatter(props.timestamp)

  return (
    <div className="MessageContainer">
      <div className="wrapper">
        <div className="avatar"
          onClick={() => props.onAuthorClick()}>
          <img src={props.authorAvatarUrl} />
        </div>
        <div className="body">
          <span
            className="author-name"
            style={{color: props.authorDisplayNameColor}}
            onClick={() => props.onAuthorClick()}>
            {props.authorDisplayName}
          </span>
          <div className="content">
            {props.content}
            <time className="time">
              {localeTimeString}
            </time>
          </div>
        </div>
      </div>
    </div>
  )
}
