import "../styles/UnreadIndicator.sass"

const UnreadIndicator = () => {
  return (
    <div className="UnreadIndicator">
      <div className="line" />

      <span className="uppercase">New messages</span>

      <div className="line" />
    </div>
  )
}

export default UnreadIndicator
