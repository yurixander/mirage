import "../styles/ImageMessage.sass"
import MessageContainer from "./MessageContainer"

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

  return (
    <div className="ImageMessage">
      <MessageContainer
        authorDisplayName={props.authorDisplayName}
        authorDisplayNameColor={props.authorDisplayNameColor}
        authorAvatarUrl={props.authorAvatarUrl}
        content={content}
        timestamp={props.timestamp}
        onAuthorClick={props.onAuthorClick} />
    </div>
  )
}
