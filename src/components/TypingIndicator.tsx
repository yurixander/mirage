import "../styles/TypingIndicator.sass"

export type TypingIndicatorUser = {
  displayName: string,
  color: string,
  avatarUrl?: string
}

export type TypingIndicatorProps = {
  users: TypingIndicatorUser[]
}

export default function TypingIndicator(props: TypingIndicatorProps) {
  const verbForm = props.users.length > 1 ? "are" : "is"
  const MAX_TYPING_USERS = 3

  const names = (
    <>
      {props.users.map(user =>
        <span style={{color: user.color}}>{user.displayName}</span>
      )}
    </>
  )

  const who = props.users.length > MAX_TYPING_USERS
    ? "Several people"
    : names

  return (
    <div className="TypingIndicator">
      <div className="dots">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
      <div className="avatars">
        {/* TODO: Create an `Avatar` component (with a `isRounded` prop) and use it here and elsewhere that avatars are currently used, for consistency. */}
        {props.users.map(user => (
          <div className="avatar" key={user.displayName}>
            <img src={user.avatarUrl} />
          </div>
        ))}
      </div>
      <div className="text">{who} {verbForm} typing...</div>
    </div>
  )
}
