const UnreadIndicator = () => {
  const lineTwClassName = "h-[1px] grow bg-red-500"

  return (
    <div className="flex flex-row items-center justify-center">
      <div className={lineTwClassName} />

      <span className="mx-3 text-xs uppercase text-red-500">
        New messages
      </span>

      <div className={lineTwClassName} />
    </div>
  )
}

export default UnreadIndicator
