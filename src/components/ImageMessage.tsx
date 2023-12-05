import "../styles/ImageMessage.sass"
import Message from "./Message"

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

  return (
    <div className="ImageMessage">
      <Message
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
  )
}
