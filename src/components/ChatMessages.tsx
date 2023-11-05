import {Message} from "../routes/App"

type Props = {
  messages: Message[]
}

export default function ChatMessages(props: Props) {
  const getDefaultAvatarUrl = (senderId: string) =>
    // TODO: Be careful with sender ID URL injection.
    `https://avatar.oxro.io/avatar.svg?name=${senderId}&caps=1&isRounded=true&length=1`

  const copySenderId = (senderId: string) =>
    navigator.clipboard.writeText(senderId)

  return (
    <div className="messages">
      {props.messages.map((message, index) => (
        <div key={index} className="message">
          {message.senderId ? (
            <>
              <img
                className="avatar"
                src={
                  message.avatarUrl ||
                  getDefaultAvatarUrl(message.senderId.substring(1))
                }
              // alt={message.sender?.name + "'s avatar"}
              />
              <div className="avatar-separator">
                <div
                  onClick={() => copySenderId(message.senderId!)}
                  className="sender-name"
                >
                  {/* {message.sender?.name} */}
                </div>
                {/* <div className="text">{message.content.body}</div> */}
              </div>
            </>
          ) : (
            <div className="text system">
              {/*message.content.body*/ "pending"}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
