import "../styles/TextMessage.sass"
import ContextMenu from "./ContextMenu"
import {faReply, faShare, faThumbTack, faTrash} from "@fortawesome/free-solid-svg-icons"
import MessageContainer from "./MessageContainer"

export type TextMessageProps = {
  authorDisplayName: string
  authorDisplayNameColor: string
  authorAvatarUrl: string
  text: string
  timestamp: number
  onAuthorClick: () => void
}

export default function TextMessage(props: TextMessageProps) {
  const contextMenuItems = [
    {
      label: "Reply",
      action: () => { },
      icon: faReply
    },
    {
      label: "Pin",
      action: () => { },
      icon: faThumbTack
    },
    {
      label: "Resend",
      action: () => { },
      icon: faShare
    },
    {
      label: "Delete",
      action: () => { },
      icon: faTrash
    }
  ]

  return (
    <ContextMenu
      id="text-menu"
      items={contextMenuItems} children={
        <MessageContainer
          authorDisplayName={props.authorDisplayName}
          authorDisplayNameColor={props.authorDisplayNameColor}
          authorAvatarUrl={props.authorAvatarUrl}
          content={<div className="message-text">{props.text}</div>}
          timestamp={props.timestamp}
          onAuthorClick={props.onAuthorClick} />
      } />
  )
}
