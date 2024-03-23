import {type FC} from "react"

export type UnreadIndicatorProps = {
  lastReadEventId: string
}

const UnreadIndicator: FC<UnreadIndicatorProps> = ({lastReadEventId}) => {
  const lineClass = "h-px grow bg-red-500"

  return (
    <div className="flex flex-row items-center justify-center">
      <div className={lineClass} />

      <span className="mx-3 text-xs uppercase text-red-500">New messages</span>

      <div className={lineClass} />
    </div>
  )
}

export default UnreadIndicator
