const UnreadIndicator = () => {
  const lineTwClassName = "h-1px grow bg-red"

  return (
    <div className="flex flex-row items-center justify-center">
      <div className={lineTwClassName} />

      <span className="mx-10px text-small uppercase text-red">
        New messages
      </span>

      <div className={lineTwClassName} />
    </div>
  )
}

export default UnreadIndicator
