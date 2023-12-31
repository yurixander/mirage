import "../styles/TypingIndicator.sass"
import Avatar from "./Avatar"

export type TypingIndicatorUser = {
  displayName: string
  color: string
  avatarUrl?: string
}

export type TypingIndicatorProps = {
  users: TypingIndicatorUser[]
}

export default function TypingIndicator(props: TypingIndicatorProps) {
  const verbForm = props.users.length > 1 ? "are" : "is"

  const names = (
    <>
      {props.users.map((user, index, array) => (
        <span key={index}>
          <span className="name text-strong" style={{color: user.color}}>
            {user.displayName}
          </span>
          {index < array.length - 2 ? ", " : ""}
          {index === array.length - 2 ? " and " : ""}
        </span>
      ))}
    </>
  )

  const MAX_VISIBLE_TYPING_USERS = 3

  const who =
    props.users.length > MAX_VISIBLE_TYPING_USERS ? "Several people" : names

  return (
    <div className="TypingIndicator">
      <div className="dots">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
      <div className="avatars">
        {props.users.map(
          (user, index) =>
            user.avatarUrl && (
              <div
                key={index}
                className={index === 1 || index === 2 ? "move-left" : ""}>
                <Avatar
                  isRounded={true}
                  displayName={user.displayName}
                  avatarUrl={user.avatarUrl}
                />
              </div>
            )
        )}
      </div>
      <div className="text">
        {who} {verbForm} typing...
      </div>
    </div>
  )
}
