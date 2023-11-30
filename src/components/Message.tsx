import "../styles/Message.sass"
import {timeFormatter} from "../util"
import ContextMenu from "./ContextMenu"
import {faReply} from '@fortawesome/free-solid-svg-icons'


export type MessageProps = {
  authorDisplayName: string
  authorDisplayNameColor: string
  authorAvatarUrl: string
  text: string
  timestamp: number
  onAuthorClick: () => void
}

export default function Message(props: MessageProps) {
  const localeTimeString = timeFormatter(props.timestamp)

  // TODO: This needs to account for other already open context menus, which should be done through global state (once a React state library is added).

  return (
    <ContextMenu items={[
      {
        label: "Reply",
        action: () => { },
        icon: faReply
      },
      {
        label: "Resend",
        action: () => { }
      },
      {
        label: "Pin",
        action: () => { }
      }
    ]} children={
      <div
        className="Message">
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
            <div className="text">{props.text}</div>
          </div>
          <time className="time">
            {localeTimeString}
          </time>
        </div>
      </div>
    } />
  )
}
