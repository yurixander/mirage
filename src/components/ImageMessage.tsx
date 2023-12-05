import "../styles/ImageMessage.sass"
import {timeFormatter} from "../util"

export type ImageMessageProps = {
  imageUrl: string,
  authorDisplayName: string
  authorDisplayNameColor: string
  authorAvatarUrl: string
  text: string
  timestamp: number
  onAuthorClick: () => void
}

export default function ImageMessage(props: ImageMessageProps) {
  const localeTimeString = timeFormatter(props.timestamp)

  return (
    <div className="ImageMessage">
      <div className="wrapper">
        <div className="avatar"
          onClick={() => props.onAuthorClick()}>
          <img src={props.authorAvatarUrl} />
        </div>
        <div className="content">
          <span
            className="author-name"
            style={{color: props.authorDisplayNameColor}}
            onClick={() => props.onAuthorClick()}>
            {props.authorDisplayName}
          </span>
          { /* <div className="text">{props.text}</div> */}
          <div className="container">
            <img className="image" src={props.imageUrl} />
          </div>
          <div className="text">{props.text}</div>
        </div>
        <time className="time">
          {localeTimeString}
        </time>
      </div>
    </div>
  )
}
