import "../styles/Message.sass"

export type MessageProps = {
  authorDisplayName: string
  authorDisplayNameColor: string
  authorAvatarUrl: string
  text: string
  timestamp: number
  onAuthorClick: () => void
}

export default function Message(props: MessageProps) {
  const time = new Date(props.timestamp)

  // FIXME: This is temporary. Proper formatting is needed. Will require a specialized library.
  const localeTimeString = time.toLocaleTimeString()

  return (
    <div className="Message">
      <div className="wrapper">
        <div className="avatar" onClick={() => props.onAuthorClick()}>
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
        <div className="time">
          {localeTimeString}
        </div>
      </div>
    </div>
  )
}
