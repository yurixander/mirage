import "../styles/ImageMessage.sass"
import ContextMenu from "./ContextMenu"
import MessageContainer from "./MessageContainer"
import {faReply} from "@fortawesome/free-solid-svg-icons"

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
  const content = (
    <div className="Content">
      <div className="container">
        <img className="image" src={props.imageUrl} />
      </div>
      <div className="text">{props.text}</div>
    </div>
  )

  const contextMenuItems = [
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
    },
    {
      label: "Save",
      action: () => { }
    },
    {
      label: "Delete",
      action: () => { }
    }
  ]

  return (
    <ContextMenu items={contextMenuItems} children={
      <div className="ImageMessage">
        <MessageContainer
          authorDisplayName={props.authorDisplayName}
          authorDisplayNameColor={props.authorDisplayNameColor}
          authorAvatarUrl={props.authorAvatarUrl}
          content={
            <div className="Content">
              <div className="container">
                <img className="image" src={props.imageUrl} />
              </div>
              <div className="text">{props.text}</div>
            </div>
          }
          timestamp={props.timestamp}
          onAuthorClick={props.onAuthorClick} />
      </div>
    } />
  )
}
