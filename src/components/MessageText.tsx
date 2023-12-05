import "../styles/MessageText.sass"
import ContextMenu from "./ContextMenu"
import {faReply} from "@fortawesome/free-solid-svg-icons"
import Message from "./Message"


export type MessageTextProps = {
  authorDisplayName: string
  authorDisplayNameColor: string
  authorAvatarUrl: string
  text: string
  timestamp: number
  onAuthorClick: () => void
}

export default function MessageText(props: MessageTextProps) {
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
      <Message
        authorDisplayName={props.authorDisplayName}
        authorDisplayNameColor={props.authorDisplayNameColor}
        authorAvatarUrl={props.authorAvatarUrl}
        content={<div className="message-text">{props.text}</div>}
        timestamp={props.timestamp}
        onAuthorClick={props.onAuthorClick} />
    } />
  )
}
